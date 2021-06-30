# Angular Services

- [Your first Angular service](#Your-first-Angular-service)
  - [Create a FlightService](#Create-a-FlightService)
  - [Bonus: Alternate Implementation *](#Bonus-Alternate-Implementation-)
  - [Bonus: useFactory **](#Bonus-useFactory-)

## Your first Angular service

### Create a FlightService

In this exercise you will develop a ``FlightService`` that takes over the communication with the Flight API via HTTPS and use it within your component:

```
[FlightSearchComponent] --> [FlightService]
```

To do this, you can follow the points below or just look up if necessary.

1. Create a service in the _flight-search_ folder. The file for this service should be named _flight.service.ts_.

2. Implement a _FlightService_ in that file, which requests the flights required by the application. The service must have the _HttpClient_ injected (and imported) to do its job.

    <details>
    <summary>Show source</summary>
    <p>

    ```TypeScript
    @Injectable({ providedIn: 'root' })
    export class FlightService {

      constructor(private http: HttpClient) {}

      find(from: string, to: string): Observable<Flight[]> {
        const url = 'http://www.angular.at/api/flight';

        const headers = new HttpHeaders()
            .set('Accept', 'application/json');

        const params = new HttpParams()
            .set('from', from)
            .set('to', to);

        return this.http.get<Flight[]>(url, {headers, params});
      }
    }
    ```

    </p>
    </details>

   In case you did bonus task _Edit flights_ above, you must now also outsource the _save_ method to the service.

    <details>
    <summary>Show source</summary>
    <p>

    ```TypeScript
    save(flight: Flight): Observable<Flight> {
      const url = 'http://www.angular.at/api/flight';

      const headers = new HttpHeaders()
          .set('Accept', 'application/json');

      return this.http.post<Flight>(url, flight, { headers });
    }
    ```

    </p>
    </details> 


2. Open the _flight-search.component.ts_ file and inject the new service into the constructor. Make sure the corresponding import was added!

    <details>
    <summary>Show source</summary>
    <p>

    ```TypeScript
    […]
    export class FlightSearchComponent {
      […]
      constructor(private flightService: FlightService) { }
      […]
    }
    ```

    </p>
    </details>

3. Use the injected _FlightService_ in the _search_ method to search for flights.

    <details>
    <summary>Show source</summary>
    <p>

    ```TypeScript
    search(): void {
      this.flightService
      .find(this.from, this.to)
      .subscribe({
        next: (flights) => {
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

4. Test your solution in the browser.

5. Make sure with the DevTools debugger that the _FlightService_ gets the _HttpClient_ injected first and then the component gets the _FlightService_ in the same way.

### Bonus: Alternate Implementation *

1. Create a new file with an ``AbstractFlightService`` in the _flight-search_ folder:

    ```TypeScript
    export abstract class AbstractFlightService {
      abstract find(from: string, to:string): Observable<Flight[]>;
    }
    ```

2. Switch to the _flight.service.ts_ file and let _FlightService_ implement the _AbstractFlightService_ class:

    ```TypeScript
    @Injectable({ [...] })
    export class FlightService implements AbstractFlightService {
      […]
    }
    ```

   The keyword _implements_ indicates that the _FlightService_ must implement all methods of the _AbstractFlightServices_. In contrast to the keyword _extends_, however, there is no inheritance.

3. Switch to the app.module.ts file and create a provider for the AbstractFlightService:

    ```typescript
    @NgModule({
      [...],
      providers: [
          { 
            provide: AbstractFlightService, 
            useClass: FlightService
          }
      ],
      [...]
    })
    export class AppModule { }
    ```

4. Request an instance of _AbstractFlightService_ **instead** of an instance of _FlightService_ in your component via dependency injection:

    <details>
    <summary>Show source</summary>
    <p>

    ```TypeScript
    constructor(private flightServie: AbstractFlightService) { […] }
    ```

    </p>
    </details>

    <br>

5. Test your solution.

6. Create a _dummy-flight.service.ts_ file in the _flight-search_ folder.

7. Provide an alternative implementation of _AbstractFlightService_ in this file. This should be called _DummyFlightService_ and return a few hard-coded flights for testing:

    ```TypeScript
    import { of } from 'rxjs';
    […]

    @Injectable()
    export class DummyFlightService implements AbstractFlightService {
      find(from: string, to: string): Observable<Flight[]> {
        return of([{id: 17, from: 'Graz', to: 'Hamburg', date: '2022-01-01', delayed: true}]);
      }
    }
    ```

   The _of_ function shown here creates an observable that returns the transferred array with flights.

8. Now let your ``AbstractFlightService`` refer to the new `` DummyFlightService``.

    <details>
    <summary>Show source</summary>
    <p>

    ```typescript
    @NgModule({
      [...],
      providers: [
          { 
            provide: AbstractFlightService, 
            useClass: DummyFlightService
          }
      ],
      [...]
    })
    export class AppModule { }
    ```

    </p>
    </details>

    <br>

9. Test your solution and make sure that the new _DummyFlightService_ is used.

10. Change the service registration again so that you can send the original _FlightService_ to all consumers who request the _AbstractFlightService_:

     ```typescript
     @NgModule({
       [...],
       providers: [
           { 
             provide: AbstractFlightService, 
             useClass: FlightService
           }
       ],
       [...]
     })
     export class AppModule { }
     ```

### Bonus: useFactory **

With ``useFactory`` you can specify a factory function that specifies how your service is to be created

  ```typescript
  @NgModule({
    [...],
    providers: [
        { 
          provide: AbstractFlightService, 
          useFactory: (http: HttpClient) => new FlightService(http),
          deps: [HttpClient]
        }
    ],
    [...]
  })
  export class AppModule { }
  ```

Create a constant ``DEBUG`` in this file, which can be either ``true`` or ``false``. Change the factory so that, depending on `` DEBUG``, it returns either the ``FlightService`` (`` DEBUG === false``) or the ``DummyFlightService`` (``DEBUG === true``).
