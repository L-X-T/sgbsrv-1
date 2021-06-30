# Router

- [Router](#Router)
  - [Routing](#Routing)
  - [Bonus: Routes with hash fragment and tracing *](#Routes-with-hash-fragment-and-tracing-)
  - [Parametrizable Routes *](#Parametrizable-Routes-)
  - [Bonus: Edit flights *](#Bonus-Edit-flights-)
  - [Bonus: Programatic Routing *](#Bonus:-Programatic-Routing-)
  
## Routing

In this exercise, you will implement the following menu structure with routing:

```
   AppComponent
      +----------- HomeComponent
      +----------- FlightSearchComponent
      +----------- PassengerSearchComponent (Dummy)
```

The following pattern is taken into account:

- The ``AppComponent`` and ``HomeComponent`` are part of the ``AppModule``
- The other two components are part of the ``FlightBookingModule``
- Each module gets assigned its own routes configuration with ``forRoot`` or ``forChild``.

If you want, guide the following through the exercise:

1. Add the following additional (dummy) components that are to serve as routing targets:
    - HomeComponent (folder ``src/app/home``)
    - PassengerSearchComponent (folder ``src/app/flight-booking/passenger-search``)

2. Make sure that the new HomeComponent is registered with the ``AppModule``.

3. Make sure that the new ``PassengerSearchComponent`` is registered with the ``FlightBookingModule``.

4. Create a route configuration ``app.routes.ts`` for your ``AppModule`` in the ``src/app`` folder.

    <details>
    <summary>Show source</summary>
    <p>

    ```typescript
    export const APP_ROUTES: Routes = [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ];
    ```

  </p>
  </details>

5. Open the file ``app.module.ts`` and import the ``RouterModule`` from Angular. Enter the route configuration from the ``app.routes.ts`` file.

    <details>
    <summary>Show source</summary>
    <p>

    ```TypeScript
    @NgModule({
      imports: [
        BrowserModule,
        FormsModule,
        FlightBookingModule,
        HttpClientModule,

        RouterModule.forRoot(APP_ROUTES) // <-- Add this line!

      ],
      declarations: [
        AppComponent,
        SidebarComponent,
        NavbarComponent,
        HomeComponent
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

    Note that the ``forRoot`` method is used here because the AppModule is the root module of the application.

6. In the folder ``src/app/flight-booking`` create a file ``flight-booking.routes.ts`` with a route configuration for the ``FlightSearchComponent`` and the ``PassengerSearchComponent``.

    <details>
    <summary>Show source</summary>
    <p>

    ```TypeScript
    export const FLIGHT_BOOKING_ROUTES: Routes = [
      {
        path: 'flight-search',
        component: FlightSearchComponent
      },
      {
        path: 'passenger-search',
        component: PassengerSearchComponent
      }
    ];
    ```

    </p>
    </details>

7. Open the file ``flight-booking.module.ts`` in the folder ``src/app/flight-booking`` and import the RouterModule. Enter the new routes configuration. Note that the **forChild** method is used here because it is a child module (feature module).

     <details>
     <summary>Show source</summary>
     <p>

     ```TypeScript
     @NgModule({
       imports: [
         CommonModule,
         FormsModule,
         SharedModule,

         RouterModule.forChild(FLIGHT_BOOKING_ROUTES) // <-- Add this line!

       ],
       declarations: [
         FlightSearchComponent,
         FlightCardComponent,
         PassengerSearchComponent,
         FlightEditComponent
       ],
       providers: [
         FlightService
       ],
       exports: [
         FlightSearchComponent
       ]
     })
     export class FlightBookingModule { }
     ```

     </p>
     </details>

8. Open the ``app.component.html`` file and replace the call to ``flight-search`` with a placeholder (``<router-outlet> </router-outlet>``) for the Router.

   <details>
   <summary>Show source</summary>
   <p>

   ```HTML
   <div class="content">
       <!-- <flight-search></flight-search> --> <!-- old --> 
       <router-outlet></router-outlet> <!-- new -->
   </div>
   ```

   </p>
   </details>

9. Open the ``sidebar.component.html`` file and update the menu entries with the routerLink attribute in order to activate the individual routes.

    <details>
    <summary>Show source</summary>
    <p>

    ```HTML
    <ul class="nav">
        <li>
            <i class="ti-home"></i>
            <p><a routerLink="home">Home</a></p>
        </li>

        <li>
            <i class="ti-arrow-top-right"></i>
            <p><a routerLink="flight-search">Flights</a></p>
        </li>

        <li>
            <i class="ti-user"></i>
            <p><a routerLink="passenger-search">Passengers</a></p>
        </li>
    </ul>
    ```

    </p>
    </details>

10. Check with the TypeScript compiler in your IDE whether there are any compilation errors and correct them if necessary.

11. Test your solution.

## Bonus: Routes with hash fragment and tracing *

In order to influence the way the router works, the ``forRoot`` method accepts an object via the second optional parameter. This can be used to specify, for example, that routes are to be positioned in the hash fragment of the url (e.g. http://localhost:4200/#/route instead of http://localhost:4200/route) or that the router should output tracing messages on the console:

```TypeScript
RouterModule.forRoot(APP_ROUTES, { useHash: true, enableTracing: true});
```

Activate these options and make sure that the route is then placed in the hash fragment and that the router outputs information about the routing to the console.

Afterwards disable the hash fragment again for the upcoming exercises: ``useHash: false``

##	Parametrizable Routes

In this exercise you will create a new component ``FlightEditComponent`` in the ``FlightBookingModule``:

```
   AppComponent
      +----------- HomeComponent
      +----------- FlightSearchComponent ---- id ----+
      +----------- PassengerSearchComponent          |
      +----------- FlightEditComponent [new!] <------+
```

This should receive an Id as a url segment and a matrix parameter showDetails which for the time being will only be printed in the template. The component should be able to be called up via your ``FlightCardComponents``.

1.Create a ``FlightEditComponent`` (as a dummy component) in the folder ``src/app/flight-booking/flight-edit``.

2. Open the file ``flight-booking.module.ts`` and make sure that the new component is registered in the ``FlightBookingModule``.

3. Have the ActivatedRoute injected into the constructor of the ``FlightEditComponent`` and call up the matrix parameters ``id`` and ``showDetails``.

    <details>
    <summary>Show source</summary>
    <p>

    ```TypeScript
    @Component({
      selector: 'app-flight-edit',
      templateUrl: './flight-edit.component.html'
    })
    export class FlightEditComponent implements OnInit {
      id: string;
      showDetails: string;

      constructor(
        private route: ActivatedRoute) { }

      ngOnInit(): void {
        this.route.params.subscribe(
          params => {
            this.id = params['id'];
            this.showDetails = params['showDetails'];
          }
        );
      }
    }
    ```

    </p>
    </details>

4. Open the file ``flight-edit.component.html`` and output the parameters you have called up there.

    <details>
    <summary>Show source</summary>
    <p>

    ```HTML
    <div class="card">
      <div class="header">
        <h1 class="title">Flight Edit</h1>
      </div>
      <div class="content">
        <p>Id: {{id}}</p>
        <p>ShowDetails: {{showDetails}}</p>
      </div>
    </div>
    ```
    
    </p>
    </details>

5. Open the file ``flight-booking.routes.ts`` and add a route for the new ``FlightEditComponent``.

    <details>
    <summary>Show source</summary>
    <p>

    ```TypeScript
    export const FLIGHT_BOOKING_ROUTES: Routes = [
      […],
      {
        path: 'flight-edit/:id',
        component: FlightEditComponent
      }
    ];
    ```

   The segment ``:id`` stands here as a placeholder for the parameter id. Since there is no placeholder for the ``showDetails`` parameter, it must be transferred as a matrix parameter.
    
    </p>
    </details>

6. Open the file ``flight-card.component.html`` and insert a link for the new route.

    <details>
    <summary>Show source</summary>
    <p>
    
    ```HTML
    <a class="btn btn-default" 
      [routerLink]="['/flight-edit', item.id, { showDetails: true }]">   
      Edit
    </a>
    ```
    
    </p>
    </details>

7. Check with the TypeScript compiler in your IDE whether there are any compilation errors and correct them if necessary.

8. Test your solution: Search for flights and click on Edit for one of the flights found.

##	Bonus: Edit flights *

In this exercise you create the opportunity to edit the flight presented in the ``FlightEditComponent``.

1. Open the file ``flight.service.ts`` and add a method ``findById``, which delivers a flight within the scope of an observable based on the ID, and a method save, which receives a flight and saves it.

    To retrieve a flight using the id, you can use the ``HttpClient`` to make a GET call with the id parameter.

    To save, you can send a flight to the server using the ``post`` method of the ``HttpClient``:

    ```TypeScript
    return this.http.post<Flight>(url, flight, { headers });
    ```

    Note that the data records with IDs 1 to 5 cannot be saved as they are reserved for presentations.

    <details>
    <summary>Show source</summary>
    <p>
    
    ```TypeScript
    findById(id: string): Observable<Flight> {
        const url = 'http://www.angular.at/api/flight';
        const params = new HttpParams()
                          .set('id', id);
        const headers = new HttpHeaders()
                          .set('Accept', 'application/json');
        return this.http.get<Flight>(url, { params, headers});
    }

    save(f: Flight): Observable<Flight> {
        const url = 'http://www.angular.at/api/flight';
        const headers = new HttpHeaders()
                          .set('Accept', 'application/json');
        return this.http.post<Flight>(url, f, { headers});
    }
    ```
  
  </p>
  </details>

2. Open the ``flight-edit.component.ts`` and add a flight property of the Flight type and an errors property of the string type. This property is intended to accommodate any errors that may arise when saving. Also, get the FlightService injected.

    <details>
    <summary>Show source</summary>
    <p>

    ```TypeScript
    @Component({
      selector: 'app-flight-edit',
      templateUrl: './flight-edit.component.html'
    })
    export class FlightEditComponent implements OnInit {
      id: string;
      showDetails: string;

      flight: Flight;
      errors: string;

      constructor(
        private route: ActivatedRoute,
        private flightService: FlightService) { }

      […]
    }
    ```

    </p>
    </details>

3. Load the respective flight in the ``FlightEditComponent`` after calling up the ``id`` parameter and offer a ``save`` method for saving.

    <details>
    <summary>Show source</summary>
    <p>

    ```TypeScript
    @Component({
      selector: 'app-flight-edit',
      templateUrl: './flight-edit.component.html'
    })
    export class FlightEditComponent implements OnInit {
      
      […]

      ngOnInit(): void {
        this.route.params.subscribe(
          params => {
            this.id = params['id'];
            this.showDetails = params['showDetails'];

            this.flightService.findById(this.id).subscribe(
              flight => { this.flight = flight; this.errors = ''; },
              err => { this.errors = 'Fehler beim Laden'; }
            );
          }
        )
      }

      save() {
        this.flightService.save(this.flight).subscribe(
          flight => { 
              this.flight = flight; 
              this.errors = 'Saving was successful!'; 
          },
          err => { this.errors = 'Error saving data'; }
        );
      }

    }
    ```

    </p>
    </details>

4. Open the file ``flight-edit.component.html`` and provide a form for editing the loaded flight:

   ```HTML
    <form *ngIf="flight">

    <div class="form-group">
        <label>Id:</label>
        <input [(ngModel)]="flight.id" name="id" class="form-control">
    </div>

    <div class="form-group">
        <label>From:</label>
        <input [(ngModel)]="flight.from" name="from" 
              class="form-control">
    </div>

    <!-- Add more fields for the other attributes of flight -->

    <button class="btn btn-default" (click)="save()">Save</button>

    </form>
    ```
   
5. Open the file ``flight-booking.module.ts`` and make sure that the ``FlightService`` is registered here.

    <details>
    <summary>Show source</summary>
    <p>
    
    ```TypeScript
    @NgModule({
      imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild(FLIGHT_BOOKING_ROUTES)
      ],
      declarations: [
        FlightSearchComponent,
        FlightCardComponent,
        PassengerSearchComponent,
        FlightEditComponent
      ],
      providers: [
        FlightService  // <-- this is important
      ],
      exports: [
        FlightSearchComponent
      ]
    })
    export class FlightBookingModule { }
    ```
    
    </p>
    </details>

   This registers the ``FlightService`` as a global service in the feature module. Since it is now used by several components, this is useful. You might also move it to the directory ``src/app/flight-booking/services`` – if you do so, make sure all imports are updated correctly by your IDE. Alternatively, it could also be registered for the FlightBookingComponent.

6. Check with the TypeScript compiler in your IDE whether there are any compilation errors and correct them if necessary.

7. Test your solution. Again note that you cannot change data records 1 to 5 and that you can create a new data record by specifying ID 0.

## Bonus: Programatic Routing *

See the documentation for the router's navigate method under [1]. Let the router inject you into the ``FlightEditComponent`` and use its ``navigate`` method after successful saving to lead the user back to the search mask.

Extension: After redirecting to the search mask, display a success message for the last save process.

[1] https://angular.io/docs/ts/latest/api/router/index/Router-class.html#!#navigate-anchor
