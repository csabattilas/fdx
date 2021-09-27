//BASIC TYPES DEFINED IN @angular/forms + rxjs/Observable
type FormGroup = import("@angular/forms").FormGroup;
type FormArray = import("@angular/forms").FormArray;
type FormControl = import("@angular/forms").FormControl;
type AbstractControl = import("@angular/forms").AbstractControl;
type Observable<T> = import("rxjs").Observable<T>;

type STATUS = "VALID" | "INVALID" | "PENDING" | "DISABLED";
type STATUS_STRING = STATUS | string;

interface AbstractControlTyped<T> extends AbstractControl {
  readonly value: T;
  valueChanges: Observable<T>;
  readonly status: STATUS_STRING;
  statusChanges: Observable<STATUS>;

  get<V = unknown>(path: Array<string | number> | string): AbstractControlTyped<V> | null;

  setValue<V>(value: V extends T ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

  patchValue<V>(value: V extends Partial<T> ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

  reset<V>(value?: V extends Partial<T> ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
}

interface FormControlTyped<T> extends FormControl {
  readonly value: T;
  valueChanges: Observable<T>;
  readonly status: STATUS_STRING;
  statusChanges: Observable<STATUS>;

  get<V = unknown>(path: Array<string | number> | string): AbstractControlTyped<V> | null;

  setValue<V>(value: V extends T ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

  patchValue<V>(value: V extends Partial<T> ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

  reset<V>(value?: V extends Partial<T> ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
}

interface FormGroupTyped<T> extends FormGroup {
  controls: { [P in keyof T]: AbstractControlTyped<T[P]> };
  readonly value: T;
  valueChanges: Observable<T>;
  readonly status: STATUS_STRING;
  statusChanges: Observable<STATUS>;

  registerControl<P extends keyof T>(name: P, control: AbstractControlTyped<T[P]>): AbstractControlTyped<T[P]>;

  registerControl<V = any>(name: string, control: AbstractControlTyped<V>): AbstractControlTyped<V>;

  addControl<P extends keyof T>(name: P, control: AbstractControlTyped<T[P]>): void;

  addControl<V = any>(name: string, control: AbstractControlTyped<V>): void;

  removeControl(name: keyof T): void;

  removeControl(name: string): void;

  setControl<P extends keyof T>(name: P, control: AbstractControlTyped<T[P]>): void;

  setControl<V = any>(name: string, control: AbstractControlTyped<V>): void;

  contains(name: keyof T): boolean;

  contains(name: string): boolean;

  get<P extends keyof T>(path: P): AbstractControlTyped<T[P]>;

  getRawValue(): T & { [disabledProp in string | number]: any };

  get<V = unknown>(path: Array<string | number> | string): AbstractControlTyped<V> | null;

  setValue<V>(value: V extends T ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

  patchValue<V>(value: V extends Partial<T> ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

  reset<V>(value?: V extends Partial<T> ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
}

interface FormArrayTyped<T> extends FormArray {
  controls: AbstractControlTyped<T>[];
  readonly value: T[];
  valueChanges: Observable<T[]>;
  readonly status: STATUS_STRING;
  statusChanges: Observable<STATUS>;

  at(index: number): AbstractControlTyped<T>;

  push<V = T>(ctrl: AbstractControlTyped<V>): void;

  insert<V = T>(index: number, control: AbstractControlTyped<V>): void;

  setControl<V = T>(index: number, control: AbstractControlTyped<V>): void;

  getRawValue(): T[];

  get<V = unknown>(path: Array<string | number> | string): AbstractControlTyped<V> | null;

  setValue<V>(value: V extends T[] ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

  patchValue<V>(value: V extends Partial<T>[] ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;

  reset<V>(value?: V extends Partial<T>[] ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
}
