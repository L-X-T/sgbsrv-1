# Angular Intro

- [Your first Angular component](#Your-first-Angular-component)
  - [Component for searching for flights](#Component-for-searching-for-flights)
  - [Use the debugger](#Use-the-debugger)
  - [Bonus: Edit flights *](#Bonus-Edit-flights-)
 
## Your first Angular component

### Component for searching for flights

In this first part of the exercise you will implement the _FlightSearchComponent_. You can follow these tutorial steps or do it your own way and just look up here for reference:

1. Create a folder _entities_ in your _src/app_ folder.

2. In _entities_ create a new file _flight.ts_:

      ```TypeScript
      export interface Flight {
        id: number; 
        from: string;
        to: string;
        date: string;
        delayed: boolean;
      }
      ```
   
3. In the folder _src/app_ create a _FlightSearchComponent_

    **Important:** There are several ways to generate a component:

      - **Visual Studio Code:** If you have installed the recommended Angular plugins go to context menu: ``Angular: Generate a Component``.  
      - **WebStorm/IntelliJ**: Here you'll find in your context menu the item ``Angular Schematics``.
      - **Terminal/Shell**: Or you can do it in your terminal/shell by using the following commands:
      
          ```
          ng generate component flight-search
          ```

          Or use the shorthand:

          ```
          ng g c flight-search
          ```

          With the flag --help you'll see the information for these command parts:

          ```
          ng g --help
          ng g c --help
          ```

4. Open the file _flight-search.component.ts_ and choose the selector _flight-search_:

    ```TypeScript
    @Component({
      selector: 'flight-search',
      templateUrl: './flight-search.component.html'
    })
    export class FlightSearchComponent implements OnInit {
      […]
    }
    ```
5. Add the following members to your class _FlightSearchComponent_:

    ```TypeScript
    @Component({
      selector: 'flight-search',
      templateUrl: './flight-search.component.html'
    })
    export class FlightSearchComponent implements OnInit {

      from: string;
      to: string;
      flights: Flight[] = [];
      selectedFlight: Flight;

      constructor(private http: HttpClient) { }

      ngOnInit(): void { }

      search(): void {
        // implementation will follow shortly
      }

      select(flight: Flight): void {
        this.selectedFlight = flight;
      }
    }
    ```

6. Now implement the method _search_, so that it takes the _from_ and _to_ parameter and uses the injected ``HttpClient`` to search for flights and put them into ``flights``.

    <details>
    <summary>Show source</summary>
    <p>

    ```TypeScript
    search(): void {
      const url = 'http://www.angular.at/api/flight';

      const headers = new HttpHeaders()
          .set('Accept', 'application/json');

      const params = new HttpParams()
          .set('from', this.from)
          .set('to', this.to);

      this.http
        .get<Flight[]>(url, {headers, params})
        .subscribe({
          next: (flights: Flight[]) => {
            this.flights = flights;
          },
          error: (errResp) => {
            console.error('Error loading flights', errResp);
          }
        });
    }
    ```
 </p>
 </details>

7.  Switch to ``flight-search.component.html``, the corresponding HTML template and insert a div with the search form. You can use the following HTML, but you have to add the **data binding**:

    ```HTML
    <div class="card">

      <div class="header">
        <h2 class="title">Flight Search</h2>
      </div>

      <div class="content">

      <form>
        <div class="form-group">
          <label>From:</label>
          <input name="from" class="form-control">
        </div>
        <div class="form-group">
          <label>To:</label>
          <input name="to" class="form-control">
        </div>
    
        <div class="form-group">
          <button
            class="btn btn-default">Search</button>
        </div>
      </form>

      </div>
    </div>
    ```
   
8. Make sure the button is only enabled if ``from`` and ``to`` are set.

    <details>
    <summary>Show source inkl. data bindings</summary>
    <p>

    ```HTML
    <div class="card">

      <div class="header">
        <h2 class="title">Flight Search</h2>
      </div>

      <div class="content">

      <form>
        <div class="form-group">
          <label>From:</label>
          <input [(ngModel)]="from" name="from" class="form-control">
        </div>
        <div class="form-group">
          <label>To:</label>
          <input [(ngModel)]="to" name="to" class="form-control">
        </div>

        <div class="form-group">
        <button
          [disabled]="!to || !from"
          (click)="search()"
          class="btn btn-default">Search</button>
        </div>
      </form>

      </div>
    </div>
    ```

    </p>
    </details>
   
9. Add another section to your template that lists the found flights in a table. Again you can use this HTML fragment, but you have to add the **data binding**:

    ```HTML
    <div class="card">

      <table class="table table-contensed">
      <thead>
      <tr>
        <th>Id</th>
        <th>From</th>
        <th>To</th>
        <th>Date</th>
        <th></th>
      </tr>
      </thead>
      <tr>
        <td>...</td>
        <td>...</td>
        <td>...</td>
        <td>...</td>
        <td>
          <a>Select</a> 
        </td>
      </tr>
      </table>

    </div>
    ```

    The selected row should receive the class ``active`` and thus be highlighted. If no flights were found the table should be hidden.

    <details>
    <summary>Show source incl. data binding</summary>
    <p>

    ```HTML
    <div class="card">

      <table class="table table-contensed" *ngIf="flights.length > 0">
      <thead>
      <tr>
        <th>Id</th>
        <th>From</th>
        <th>To</th>
        <th>Date</th>
        <th></th>
      </tr>
      </thead>
      <tr *ngFor="let f of flights" 
        [class.active]="f === selectedFlight">
        <td>{{f.id}}</td>
        <td>{{f.from }}</td>
        <td>{{f.to }}</td>
        <td>{{f.date | date:'dd.MM.yyyy HH:mm'}}</td>
        <td>
          <a (click)="select(f)">Select</a> 
        </td>
      </tr>
      </table>

    </div>
    ```

    </p>
    </details>

10. Add a third section to your template. It should present the selected flight:

     ```HTML
     <div class="card">
       <div class="content">
         <!-- {{title}} --> <!-- old row  -->
         <pre>{{ selectedFlight | json }}</pre> <!-- new row --> 
       </div>
     </div>
     ```

11. Open the file _app.module.ts_ make sure, that the new _FlightSearchComponent_ is registered in _declarations_.

     <details>
     <summary>Show source</summary>
     <p>

     ```TypeScript
     @NgModule({
       imports: [
         BrowserModule,
         FormsModule,
         HttpClientModule
       ],
       declarations: [
         AppComponent,
         FlightSearchComponent,
         […] // keep the rest here
       ],
       providers: [],
       bootstrap: [AppComponent]
     })
     export class AppModule { }
     ```

     </p>
     </details>

12. Switch to the file _app.component.html_, to call the new component:

    ```HTML
    […]
    <div class="content">
      <flight-search></flight-search>
    </div>
    […]
    ```

13. Check for compilation errors on the console.

14. Start your solution (``npm start``) and test it in the browser by search for flights from ``Graz`` to ``Hamburg``. A list with other supported (European) cites can be found [here](http://angular.at/api/airport).

### Use the debugger

1. In Chrome, open the Developer Tools (F12).

2. Switch to the Source tab and close all files there.

3. Press STRG+P and search for _flight-search.component_.

4. Create a breakpoint in your _search_ method.

5. Look for flights and find that the browser stops execution at your breakpoint.

6. Take a look at the information the debugger provides about each variable. These are displayed when you mouse-over and go through your method step by step.

### Bonus: Edit flights *

Create a possibility to edit the selected flight. Therefore you'll show a form after the selection. 

Follow these steps:

1. Add a member _message_ to your **existing** component, this will store either the success or the fail message.

    <details>
    <summary>Show source</summary>
    <p>

    ```TypeScript
    @Component({
      selector: 'flight-search',
      templateUrl: './flight-search.component.html'
    })
    export class FlightSearchComponent {

      message: string;

      [...]
    }
    ```

    </p>
    </details>


2. Add a method to your **existing** component for saving the selected flight. Use the ``HttpClient`` to POST the _selectedFlight_ back to the backend server (don't forget to subscribe):
 
    ```TypeScript
      this.http
      .post<Flight>(url, this.selectedFlight, { headers })
      .subscribe( ... );
    ```

    <details>
    <summary>Show source</summary>
    <p>
    
    ```TypeScript
    save(): void {
      const url = 'http://www.angular.at/api/flight';

      const headers = new HttpHeaders()
              .set('Accept', 'application/json');

      this.http
        .post<Flight>(url, this.selectedFlight, { headers })
        .subscribe({
          next: flight => {
            this.selectedFlight = flight;
            this.message = 'Success!';
          },
          error: errResponse => {
            console.error('Error', errResponse);
            this.message = 'Error: ';
          }
        });
    }
    ```
    
    </p>
    </details>

3. Create the option to edit the _selectedFlight_ in the template. In order to avoid zero accesses, you should check with _*ngIf_ whether there is a selected flight. You can use the following HTML fragment, which you still need to add data binding expressions: 

    ```HTML
    <div *ngIf="selectedFlight">

      <div>
      {{ message }}
      </div>

      <div class="form-group">
      <label>Id</label>
      <input class="form-control">
      </div>

      <div class="form-group">
      <label>From</label>
      <input class="form-control">
      </div>

      <!-- add fields for other attributes -->

      […]
    
      <button class="btn btn-default">Save</button>

    </div>
    ```

    <details>
    <summary>Show source incl. data binding</summary>
    <p>
    
    ```HTML
    <div *ngIf="selectedFlight">

      <div>
      {{ message }}
      </div>

      <div class="form-group">
      <label>Id</label>
      <input [(ngModel)]="selectedFlight.id" class="form-control">
      </div>

      <div class="form-group">
      <label>From</label>
      <input [(ngModel)]="selectedFlight.from" class="form-control">
      </div>

      <!-- add fields for other attributes -->

      […]
    
      <button (click)="save()" class="btn btn-default">Save</button>

    </div>
    ```
    
    </p>
    </details>

4. Run the application and test it. Note that you cannot edit the data records with IDs 1 to 5 so that these data records are available in every demo. You can assign ID 0 to create a new flight. After saving on the server, this will be replaced by the next free ID.

## Create your own pipe

1. In the _src/app_ folder, create the sub-folders _shared / pipes_.

2. In this folder, create a new file _city.pipe.ts_ with a _CityPipe_. This pipe should transfrom the city names such as `` Graz`` or ``Hamburg`` depending on a transferred parameter either on airport codes such as ``GRZ`` or `` HAM`` or on long names such as ``Flughafen Graz Thalerhof`` or `` Airport Hamburg Helmut Schmidt``.

    <details>
    <summary>Show source</summary>
    <p>
    
    ```TypeScript
    import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({
      name: 'city',
      pure: true
    })
    export class CityPipe implements PipeTransform {
      transform(value: string, fmt: string): string {
        let short, long;

        switch(value) {
          case 'Graz':
            short = 'GRZ';
            long = 'Airport Graz Thalerhof';
            break;
          case 'Hamburg':
            short = 'HAM';
            long = 'Airport Hamburg Fulsbüttel Helmut Schmidt';
          break;
          case 'Wien':
            short = 'VIE';
            long = 'Airport Wien Schwechat';
          break;
          default:
            short = long = value;
        }

        if (fmt === 'short') {
          return short;
        }
        
        return long;
      }
    }
    ```
    
    </p>
    </details>

3. Open the _app.module.ts_ file and make sure the new pipe has been registered.

    <details>
    <summary>Show source</summary>
    <p>

    ```TypeScript
    @NgModule({
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule
      ],
      declarations: [
        [...],
        AppComponent,
        FlightSearchComponent,
        CityPipe   // <-- this line should be here!
      ],
      providers: [
        […]
      ],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```

    </p>
    </details>


4. Open the file _flight-search.component.html_ and use the _CityPipe_ to format the cities of the flights found.

    <details>
    <summary>Show source</summary>
    <p>
    
    ```TypeScript
    <div class="card">

      <table class="table table-contensed" *ngIf="flights.length > 0">
      <thead>
      <tr>
      <th>Id</th>
      <th>From</th>
      <th>To</th>
      <th>Date</th>
      <th></th>
      </tr>
      </thead>
      <tr *ngFor="let f of flights" 
        [class.active]="f === selectedFlight">
      <td>{{f.id}}</td>
      <td>{{f.from | city:'short' }}</td>
      <td>{{f.to | city:'long' }}</td>
      <td>{{f.date | date:'dd.MM.yyyy HH:mm'}}</td>
      <td>
        <a (click)="select(f)">Select</a> 
      </td>
      </tr>
      </table>

    </div>
    ```
    
    </p>
    </details>

5. Test your solution.

## Bonus tasks on pipes

### Bonus: StatusColorPipe *

Create a _StatusColorPipe_, which maps the property _delayed_ of the flight (true or false) to a color. Use this pipe together with the _ngStyle_ directive to assign this color to the CSS property _color_ of the output status:

```HTML
<td [ngStyle]="{color: f.delayed | statusColor }">
 {{ f.date | date:'dd.MM.yyyy HH:mm'}}
</td>
```

### Bonus: StatusFilterPipe *

Create a _StatusFilterPipe_, which filters an array with flights, so that only flights with a certain value for _delayed_ are returned. The pipe should be able to be used as follows:

```HTML
<tr *ngFor="let f of flights | statusFilter:true">
  […]
</tr>
```

The parameter _true_ indicates that only the flights with _delayed = true_ are to be returned.

The transform method of this pipe takes the entire array and then returns a filtered version:

```TypeScript
transform(flights: Flight[], delayed: boolean): Flight[] {
 […]
}
```

A description of the methods offered by the Array class can be found here:
[https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global\_Objects/Array](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array)

### Bonus: Service for a Pipe *

Outsource the logic with the switch block to a new ``AirportService``. Let the `` AirportService`` inject it into the constructor of the pipe (works like components). Then call the service in the ``transform`` method and test your solution.

### Bonus: Asynchronous service for a Pipe **

Under the following urls you will find two services that provide the official short and the official long name of an airport (as a string):

- [http://angular-at.azurewebsites.net/api/airport/code?name=Graz](http://angular-at.azurewebsites.net/api/airport/code?name=Graz)
- [http://angular-at.azurewebsites.net/api/airport/fullName?name=Graz](http://angular-at.azurewebsites.net/api/airport/fullName?name=Graz)

Expand your airport service with methods that return the long or short name of an airport as ``Observable<String>``.

Write a new ``AsyncCityPipe`` that injects this service. The ``transform`` method should delegate to the service and return the desired result in the form of the received as _Observable&lt;string&gt;_. In order for Angular to be able to resolve this observable, the async pipe must also be used in the template:

```HTML 
[...]
  {{ f.from | asyncCity:'short' | async }}
[...]
``` 

**Important:** The pipe must be ``pure`` to avoid problems with the data binding. Pipes that are not pure are re-executed after each event. The fact that the pipe itself triggers a data event through the server request would result in an infinite loop.

## Modules

In this exercise you will refactor your solution so that the following module structure results:

```
[AppModule] --> [FlightBookingModule] --> [SharedModule]
```

Each module has its own folder and within this the ``FlightSearchComponent`` is moved to the newly created folder of the ``FlightBookingModule``:

```
 /src
 +-- /app
  +-- ...
  +-- /flight-booking
   +-- ...
   +-- /flight-search
    +-- flight-search.component.ts
    +-- flight-search.component.html
    +-- ..
   +-- flight-booking.module.ts
  +-- /shared
   +-- ...
   +-- shared.module.ts
  +-- app.module.ts
```

Remember that the ``SharedModule`` and the ``FlightBookingModule`` must import the Angular ``CommonModule`` (``@angular/common``) so that Angular directives and pipes such as ``ngFor`` or ``date`` can be used.

<details>
<summary>Show steps for module structure</summary>
<p>

1. Create a _shared.module.ts_ file in the _shared_ folder and give this file a _SharedModule_ class:

    ```TypeScript
    @NgModule({
      imports: [
        CommonModule
      ],
      declarations: [
        CityPipe
      ],
      exports: [
        CityPipe
      ]
    })
    export class SharedModule { }
    ```

   Note that the _CityPipe_ is now both declared and exported here.

2. In the _src/app_ folder, create a _flight-booking_ folder.

3. Move the folder _flight-search_ to _flight-booking_. Adjust all existing relative paths in case this refactoring step is not taken over by your IDE anyway.

4. In the _flight-booking_ folder, create a _flight-booking.module.ts_ file with a _FlightBookingModule_:

    ```TypeScript
    @NgModule({
    imports: [
      CommonModule,
      FormsModule,
      SharedModule
    ],
    declarations: [
      FlightSearchComponent
    ],
    providers:[
    ],
    exports: [
      FlightSearchComponent
    ]
    })
    export class FlightBookingModule { }
    ```

   Note that the _SharedModule_ is imported here. The _CityPipe_ it offers is used in the _FlightSearchComponent_.

5. Switch to the _app.module.ts_ file and adapt your _AppModule_ as follows:

    ```TypeScript
    @NgModule({
    imports: [
      BrowserModule,
      HttpClientModule,
      FlightBookingModule // <-- important
    ],
    declarations: [
      AppComponent,
      SidebarComponent,
      NavbarComponent
    ],
    providers: [
      […]
    ],
    bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```

6. Serve your solution and correct any compile errors (e.g. incorrect relative paths that resulted from the move).

7. Test your restructured solution.
</p>
</details>

## Components Deep dive

In this exercise you will first create the FlightCardComponent shown. Then you will create your own component with the knowledge you have built up in a bonus exercise.

### FlightCardComponent

1. Create a new component ``flight-card`` in the folder of the module ``flight-booking``, which consists of a sub-folder ``flight-card`` with the following files:

    - ``flight-card.component.html``
    - ``flight-card.component.ts``

2. Open the file ``flight-card.component.ts`` and add the following members:

    ```TypeScript
    @Component({
      selector: 'flight-card',
      templateUrl: './flight-card.component.html'
    })
    export class FlightCardComponent implements OnInit {

      constructor() { }

      @Input() item: Flight;
      @Input() selected: boolean;
      @Output() selectedChange = new EventEmitter<boolean>();

      ngOnInit(): void {}

      select(): void {
        this.selected = true;
        this.selectedChange.next(this.selected);
      }

      deselect(): void {
        this.selected = false;
        this.selectedChange.next(this.selected);
      }

    }
    ```

   Note that the _flight-card_ selector was set here, you could also use _app-flight-card_ of course.

3. Open the template of this component (``flight-card.component.html``). Expand this file so that the map is displayed:

    ```TypeScript
    <div class="card" [ngStyle]="{'background-color': (selected) ? 'rgb(204, 197, 185)' : 'white' }">
      <div class="header">
        <h2 class="title">{{item.from}} - {{item.to}}</h2>
      </div>
      <div class="content">
        <p>Flight-No.: #{{item.id}}</p>
        <p>Date: {{item.date | date:'dd.MM.yyyy HH:mm'}}</p>

        <p>
          <button
            class="btn btn-default"
            *ngIf="!selected"
            (click)="select()">Select</button>
          <button
            class="btn btn-default"
            *ngIf="selected"
            (click)="deselect()">Remove</button>
        </p>
      </div>
    </div>
    ```

   Note the data binding expressions in this template.

4. Switch to the _flight-booking.module.ts_ file. Make sure that the new _FlightCardComponent_ is registered here.

    <details>
    <summary>Show source</summary>
    <p>
    
    ```TypeScript
    @NgModule({
    imports: [
      CommonModule,
      FormsModule,
      SharedModule
    ],
    declarations: [
      FlightSearchComponent,
      FlightCardComponent  // <-- important
    ],
    providers:[ ],
    exports: [
      FlightSearchComponent
    ]
    })
    export class FlightBookingModule { }
    ```
    
    </p>
    </details>

5. Open the file _flight-search.component.ts_ and add the one property _basket_:

    ```TypeScript
    export class FlightSearchComponent implements OnInit {

      from: string;
      to: string;
      flights: Flight[] = [];
      selectedFlight: Flight;


      basket: object = {   // <-- new attribute
        "3": true,
        "5": true
      };

      […]
    }
    ```

6. Open the file _flight-search.component.html_. Comment out the tabular output of the flights found.

7. Instead of the table, use the new element ``flight-card`` to display the flights found. To do this, create an explicit binding for the properties ``item``, ``selected`` and the event ``selectedChange``.

    <details>
    <summary>Show source</summary>
    <p>

    ```HTML
    <div class="row">
      <div *ngFor="let f of flights" 
      class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
      <flight-card
        [item]="f"
        [selected]="basket[f.id]"
        (selectedChange)="basket[f.id] = $event">
      </flight-card>
      </div>
    </div>
    ```

    </p>
    </details>

8. At the end of the template, also update the shopping cart so that the new property ``basket`` is output here instead of ``selectedFlight``.

    <details>
    <summary>Show source</summary>
    <p>
    
    ```HTML
    <div class="card">
      <div class="content">
      <pre>{{ basket | json }}</pre>
      </div>
    </div>
    ```
    
    </p>
    </details>

9. Test your solution.

10. When calling the _FlugCardComponent_, use a two-way binding using the "Banana-in-a-Box syntax" instead of the bindings for _selected_ and _selectedChanged_.

    <details>
    <summary>Show source</summary>
    <p>

    ```TypeScript
    <div class="row">
      <div *ngFor="let f of flights" 
      class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
      <flight-card
        [item]="f"
        [(selected)]="basket[f.id]">
      </flight-card>
      </div>
    </div>
    ```

    </p>
    </details>

11. Test your solution.

### Bonus: FlightStatusToggleComponent **

Create a _StatusToggleComponent_ that receives the delayed flag of a flight via two-way binding and displays it as a link. Each time you click on this link, the status should be changed. The component should be able to be called in the template of the FlightCardComponent as follows:

```HTML
<status-toggle [(status)]="item.delayed"></status-toggle>
```

### Bonus: Content Projection **

In this bonus exercise you create the possibility of expanding the display of the _FlightCardComponent_ by transferring additional HTML to be displayed when it is called.

1. Open the file flight-search.component.html and transfer additional HTML to the_FlightCardComponent_:

    ```HTML
    <flight-card […]>
      <pre>{{ f | json }}</pre>
    </flight-card> 
    ```

2. Place the _ng-content_ element in the **Template** of the **FlightCardComponent** to indicate where the passed content should be displayed:

    ```HTML
    […]
    <div class="content">
      <p>Flight-No.: #{{item.id}}</p>
      <p>Date: {{item.date | date:'dd.MM.yyyy HH:mm'}}</p>

        <ng-content></ng-content>

      […]
    </div>
    […]
    ```

3. Test your solution.

4. Add to the template so that it now uses the _ng-content_ element twice - once in the upper area and once in the lower area of the component:
    ```HTML
    […]
    <div class="content">
      <ng-content select=".top"></ng-content>

      <p>Flight-No.: #{{item.id}}</p>
      <p>Date: {{item.date | date:'dd.MM.yyyy HH:mm'}}</p>

      <ng-content select=".bottom"></ng-content>

      […]
    </div>
    […]
    ```

   In order to show Angular what has to be inserted into the individual placeholders defined with _ng-content_, they receive a CSS selector via the property _select_, which addresses part of the transferred markup. For example, the _.top_ selector searches the markup for an element with the _top_ class and inserts it into the respective _ng-content_ element.

5. Open the file _flight-search.component.html_. When calling the _flight-card_ elements, pass the two defined placeholders:

    ```HTML
    <flight-card [...]>
      <h1 class="top">Flight</h1>
      <pre class="bottom">{{ f | json }}</pre>
    </flight-card>
    ```

6. Test your solution.
