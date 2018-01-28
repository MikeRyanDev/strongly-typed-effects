import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';
import { OperatorFunction } from 'rxjs/interfaces';


enum ActionTypes {
  Add = 'add',
  Subtract = 'subtract',
}

interface Add {
  type: ActionTypes.Add;
  amountToAdd: number;
}

interface Subtract {
  type: ActionTypes.Subtract;
  amountToSubtract: number;
}

type ActionUnion = Add | Subtract;

type ActionWithType<Type extends string> = { type: Type };
type ActionsOfType<A, T extends string> = A extends ActionWithType<T> ? A : never;

function ofType<V, T1 extends string>(t1: T1): OperatorFunction<V, ActionsOfType<V, T1>>;
function ofType<V, T1 extends string, T2 extends string>(t1: T1, t2: T2): OperatorFunction<V, ActionsOfType<V, T1 | T2>>;
function ofType<V, T1 extends string, T2 extends string, T3 extends string>(t1: T1, t2: T2, t3: T3): OperatorFunction<V, ActionsOfType<V, T1 | T2 | T3>>;
function ofType<V, T1 extends string, T2 extends string, T3 extends string, T4 extends string>(t1: T1, t2: T2, t3: T3): OperatorFunction<V, ActionsOfType<V, T1 | T2 | T3 | T4>>;
function ofType(...types: string[]) {
  return function (source: Observable<any>) {
    return source.pipe(filter(action => types.indexOf(action.type) !== -1)) as any;
  }
}

function getAddActions(source: Observable<ActionUnion>): Observable<Subtract> {
  return source.pipe(ofType(ActionTypes.Add));
}

type t0 = ActionsOfType<ActionUnion, ActionTypes.Add>
