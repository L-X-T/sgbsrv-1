# Angular Modules

- [Work with modules](#work-with-modules)

## Work with modules

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
