# Angular Pipes

  - [Create your own pipe](#Create-your-own-pipe)
  - [Bonus tasks on pipes](#Bonus-tasks-on-pipes)
    - [Bonus: StatusColorPipe *](Bonus-StatusColorPipe-)
    - [Bonus: StatusFilterPipe *](Bonus-StatusFilterPipe-)
    - [Bonus: Service for a Pipe *](#Bonus-Service-for-a-Pipe-)
    - [Bonus: Asynchronous service for a Pipe **](#Bonus-Asynchronous-service-for-a-Pipe-)

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
