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
