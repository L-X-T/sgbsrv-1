# Reactive Forms

- [Reactive Forms](#Reactive-Forms)
    - [Edit flights](#Edit-flights)
    - [Using Angular Validators](#Using-Angular-Validators)
    - [Custom Validators](#Custom-Validators)
    - [Parametrizable Validators](#Parametrizable-Validators)
    - [Multifield Validators](#Multifield-Validators)
    - [Bonus: Load flight *](#Bonus-Load-flight-)
    - [Bonus: Save flight *](#Bonus-Save-flight-)

## Edit flights

In this exercise, you will create a reactive form for editing flights.

1. **If** you do not have a ``FlugEditComponent`` yet: Create a ``FlugEditComponent`` in the ``FlightBookingModule`` and call it up in the template of the ``FlightSearchComponent``.

2. Import the ``ReactiveFormsModule`` into your ``FlightBookingModule``.

    <details>
    <summary>Show source</summary>
    <p>

    ```typescript
    [...]
    import { ReactiveFormsModule } from '@angular/forms';
    [...]

    @NgModule({
        [...]
        imports: [
            [...]
            ReactiveFormsModule
        ],
        [...]
    })
    export class FlightBookingModule {
    }
    ```
    
    </p>
    </details>

3. Add a FormGroup with the name ``editForm`` to your ``FlightEditComponent``.

    <details>
    <summary>Show source</summary>
    <p>
    
    ```typescript

    [...]
    import {FormGroup} from '@angular/forms';

    @Component({[...]})
    export class FlightEditComponent implements OnInit {

        editForm: FormGroup;
    
        [...]
    }
    ```
    
    </p>
    </details>


4. Inject the FormBuilder into the ``FlightEditComponent``.

    <details>
    <summary>Show source</summary>
    <p>
    
    ```typescript
    import {[...], FormBuilder} from '@angular/forms';

    @Component({
        [...]
    })
    export class FlightEditComponent implements OnInit {
        [...]  
        constructor(private fb: FormBuilder) {
        }
        [...]
    }
    ```
    
    </p>
    </details>


5. Use the ``FormsBuilder`` in the ``ngOnInit`` method to create a ``FormGroup`` that describes a flight. Add this to the ``editForm``.

    <details>
    <summary>Show source</summary>
    <p>
    
    ```typescript

    export class FlightEditComponent implements OnInit {
        [...]  
        ngOnInit() {
            this.editForm = this.fb.group({
                id:   [1],
                from: [],
                to:   [],
                date: []
            });
        }
        [...]
    }
    ```
    
    </p>
    </details>


6. With the code completion of your IDE/editor, explore the methods of editForm. For demonstration, output the properties ``value``, ``valid``, ``touched`` and ``dirty`` on the console.
    
    <details>
    <summary>Show source</summary>
    <p>

    ```typescript

    export class FlightEditComponent implements OnInit {
        [...]  
        ngOnInit() {
            [...]
            console.log(this.editForm.value);
            console.log(this.editForm.valid);
            console.log(this.editForm.touched);
            console.log(this.editForm.dirty);
        }
        [...]
    }
    ```

    </p>
    </details>

7. Register for ``valueChanges`` on your ``editForm`` and output the received value on the console in order to keep up to date with changes to the form.

    <details>
    <summary>Show source</summary>
    <p>

    ```typescript

    export class FlightEditComponent implements OnInit {
    [...]  
        ngOnInit() {
            [...]
            this.editForm.valueChanges.subscribe(v => {
                console.debug('changes', v);
            });
        }
    [...]
    }
    ```

    </p>
    </details>
    
8. Now switch to the file ``flight-edit.component.html``. Create a form there that you can link to the ``FormGroups`` in the ``editForm`` property.

    <details>
    <summary>Show source</summary>
    <p>

    ```html
    <form [formGroup]="editForm">
        <div class="form-group">
            <label>Id:</label>
            <input formControlName="id" class="form-control">
        </div>

        <div class="form-group">
            <label>Date:</label>
            <input formControlName="date" class="form-control">
        </div>

        <div class="form-group">
            <label>From:</label>
            <input formControlName="from" class="form-control">
        </div>

        <div class="form-group">
            <label>To:</label>
            <input formControlName="to" class="form-control">
        </div>

        <div class="form-group">
            <button (click)="save()" class="btn btn-default">Save</button>
        </div>

    </form>
    ```

    </p>
    </details>

9. Test your solution. If everything works, you should see every change you make to the form in the console output.

## Using Angular Validators

In this exercise you will validate the _from_ field with the built-in validators ``required`` and ``minlength``.

1. Switch to the flight-edit.component.ts file and specify when setting up the FormGroup that the from property is to be validated with ``required`` and ``minlength``. The latter validator is intended to ensure that at least three characters are recorded.

    <details>
    <summary>Show source</summary>
    <p>

    ```typescript		
    [...]
    ngOnInit(): void {
        this.editForm = this.fb.group({
            id:   [1],
            from: [null, [Validators.required, Validators.minLength(3)]],
            to:   [null],
            date: [null]
        });

    }
    [...]		
    ```	

    </p>
    </details>

2. Switch to the ``flight-edit.component.html`` file and enter the ``errors`` property of the ``from`` control there. You can use the built-in json pipe.
 
    <details>
    <summary>Show source</summary>
    <p>

    ```TypeScript
    <input  formControlName="from">		
    [...]           
    errors: {{editForm.controls['from'].errors | json}}	
    ```

    </p>
    </details> 
 
3. Also use the control's ``hasError`` method to find out whether the ``minlength`` error has occurred.

    <details>
    <summary>Show source</summary>
    <p>

    ```TypeScript
    <input  formControlName="from" [...] >		
    [...]
    <div class="text-danger" *ngIf="editForm.controls['from'].hasError('minlength')">		
        ...minlength...
    </div>		
    ```

    </p>
    </details>

## Custom Validators

In this exercise, you will write your own validator for your reactive form, which checks the cities entered against a hard-coded whitelist.

1. Create a ``validation`` folder in the ``shared`` folder (if it does not already exist).

2. Create a city-validator.ts file in the validation folder. Place a validation function ``validateCity`` there, which receives an ``AbstractControl``, checks the recorded city against hard-coded values and returns an error description object.

    <details>
    <summary>Show source</summary>
    <p>

    ```typescript
    import {AbstractControl, ValidationErrors} from '@angular/forms';

    export function validateCity(c: AbstractControl): ValidationErrors | null {
        const validCities: string[] = ['Vienna', 'Cologne', 'Bern'];
        if (c.value && validCities.indexOf(c.value) === -1) {
            return {
                city: {
                    actualValue: c.value,
                    validCities: validCities
                }
            }
        }
        return null;
    }
    ```

    </p>
    </details>

3. Switch to the ``flight-edit.component.ts`` file and register the new validation function for the ``from`` field there.

    <details>
    <summary>Show source</summary>
    <p>

    ```typescript
    [...]
    import {validateCity} from '[...]';

    @Component({
        [...]
    })
    export class FlightEditComponent implements OnInit {
    
    ngOnInit(): void {
        this.editForm = this.fb.group({
            [...]
            from: [null, [[...], validateCity]],
            [...]
        });
    }
    ```
    </p>
    </details>

4. Go to the file ``flight-edit.component.html`` and check whether the custom error ``city`` has occurred. In this case, issue an error message - you might use your previously created ``FieldValidationErrorsComponent`` again here

    <details>
    <summary>Show source</summary>
    <p>

    ```html
    [...]
    <div class="text-danger" *ngIf="editForm.controls['from'].hasError('city')">
        ...city...
    </div>
    [...]
    ```

    </p>
    </details>

5. Test your solution

## Parametrizable Validators

In this exercise, you will make the validator from the last exercise parameterizable so that it checks the entries against a whitelist that is passed as parameters.

1. Switch to the ``city-validator.ts`` file and expand the ``validateCity`` function so that it accepts a whitelist with city names as a string array and returns the actual validation function.

    <details>
    <summary>Show source</summary>
    <p>

    ```typescript
    import {[...], ValidatorFn} from '@angular/forms';
    [...]
    export function validateCity (validCities: string[]): ValidatorFn {
        return (c: AbstractControl) => {
            if (c.value && validCities.indexOf(c.value) === -1) {
                return {
                    city: {
                        actualValue: c.value,
                        validCities: validCities
                    }
                };
            }
            return null;
        };
    }
    ```

    </p>
    </details>

2. Open the file ``flight-edit.component.ts`` and update the use of ``validateCity`` here so that a whitelist is transferred.

    <details>
    <summary>Show source</summary>
    <p>

    ```typescript
    [...]
    this.editForm = this.fb.group({
        [...]
        from: [null, [[...], validateCity(['Vienna', 'Berlin', 'Gleisdorf'])]],
        [...]
        });
    [...]
    ```

    </p>
    </details>

3. Test your solution.

## Multifield Validators

In this exercise you will write a multifield validator that ensures that a different value is recorded in the fields ``from`` and ``to``.

1. Create a file ``round-trip-validator.ts`` under shared / validation.

2. Add a validation function to this new file called ``validateRoundTrip``, which receives a ``FormGroup``, determines its controls ``from`` and ``to`` and - if they exist - checks whether they have the same value.

    <details>
    <summary>Show source</summary>
    <p>

    ```typescript
    [...]   
    export function validateRoundTrip(g: FormGroup): object {
       let from = g.controls['from'];
       let to = g.controls['to'];

       if (!from || !to) return null;

       if (from.value === to.value) {
           return { roundTrip: true };
       }

       return null;
    }
    [...]
    ```
    </p>
    </details>

3. Switch to the ``flight-edit.component.ts`` file and register the new validator with the ``FormGroup``.

    <details>
    <summary>Show source</summary>
    <p>

    ```typescript
    [...]
    import {validateRountTrip} from '[...]';

    @Component({
        [...]
    })
    export class FlightEditComponent implements OnInit {
    
        ngOnInit(): void {
            [...]
            this.editForm.validator = validateRoundTrip;
        }

    }
    ```
    </p>
    </details>


4. Open the file ``flight-edit.component.html`` and check whether the error ``rountTrip`` has occurred. In this case, issue an error message.

    <details>
    <summary>Show source</summary>
    <p>

    ```html
    [...]
    <div class="text-danger" *ngIf="editForm?.hasError('roundTrip')">
        ...roundTrip...
    </div>
    [...]
    ```

    </p>
    </details>

## Bonus: Load flight *

Load any flight whose id you save as a constant for the time being and write it in the form. To do this, you can transfer the flight to the ``patchValue`` method of ``editForm``.

<!--
**Extension**: **If** you have already implemented routing, you can also receive the ID of the flight via the url.
-->

## Bonus: Save flight *

Create a save button. This should retrieve the current flight from the form (``editForm.value``) and transfer it to a ``save`` method of the ``FlightService``.

This should send the flight to the server with the ``post`` method of the ``HttpClient`` (``http.post<Flight>(url, flight).subscribe(...)``).

**Please note** that you cannot save data sets with IDs 1 to 5. These are reserved for presentations. To insert a new data record, assign the ID 0.
