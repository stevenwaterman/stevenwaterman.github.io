import { SnippetConfig } from "../../lib/blog/blogData"

const actions: SnippetConfig = {
  name: "Actions",
  language: "ts",
  snippet: `const incrementAction = createAction("increment");
  const setAction = createAction<number, "set">("set");`
}

const createReducer: SnippetConfig = {
  name: "Typical Reducer",
  language: "ts",
  snippet: `const reducer = createReducer(0, {
    "increment": (state) => state + 1,
    "set": (state, action: PayloadAction<number>) => action.payload
  });`
}

const reducerUsage: SnippetConfig = {
  name: "Reducer Usage",
  language: "ts",
  snippet: `const oldState = 0;
  reducer(oldState, setAction(3));
  reducer(oldState, incrementAction());`
}

const invalidAction: SnippetConfig = {
  name: "Invalid Action",
  language: "ts",
  snippet: `const decrementAction = createAction("decrement");
  const oldState = 0;
  reducer(oldState, decrementAction());`
}

const invalidPayload: SnippetConfig = {
  name: "Invalid Payload",
  language: "ts",
  snippet: `const oldState = 0;
  reducer(oldState, {
    type: "set",
    payload: "this is meant to be a number"
  });`
}

const builtInBuilder: SnippetConfig = {
  name: "Built-in Builder",
  language: "ts",
  snippet: `const reducer = createReducer(0, (builder => builder
    .addCase(incrementAction, (state) => state + 1)
    .addCase(setAction, (state, action) => action.payload)
  ));
  
  const oldState = 0;
  reducer(oldState, setAction(3));
  reducer(oldState, incrementAction());`
}

const builderInvalidActions: SnippetConfig = {
  name: "Invalid Actions",
  language: "ts",
  snippet: `const decrementAction = createAction("decrement");
  reducer(oldState, decrementAction());
  
  reducer(oldState, {
    type: "set",
    payload: "this should be a number"
  });
  
  reducer(oldState, {
    type: "nonexistent",
    payload: "action"
  });`
}

const typeSafeBuilder: SnippetConfig = {
  name: "Type-Safe Builder",
  language: "ts",
  snippet: `import { createReducer, PayloadAction, ActionCreatorWithPayload, Reducer, Draft } from "@reduxjs/toolkit";
  type ActionHandler<STATE, PAYLOAD> = (state: Draft<STATE>, payload: PAYLOAD) => STATE;
  
  export class ReducerBuilder<STATE, ACTIONS extends PayloadAction<any, string>>{
    private readonly initialState: STATE;
    private readonly cases: Array<{type: string; handler: ActionHandler<STATE, any>}>;
  
    private constructor(
      initialState: STATE, 
      cases: Array<{type: string; handler: ActionHandler<STATE, any>}>
    ) {
      this.initialState = initialState;
      this.cases = cases;
    }
  
    static new<STATE>(initialState: STATE): ReducerBuilder<STATE, never> {
      return new ReducerBuilder(initialState, [])
    }
  
    addCase<TYPE extends string, PAYLOAD>(
      actionCreator: ActionCreatorWithPayload<PAYLOAD, TYPE>, 
      actionHandler: ActionHandler<STATE, PAYLOAD>
    ): ReducerBuilder<STATE, ACTIONS | PayloadAction<PAYLOAD, TYPE>> {
      return new ReducerBuilder(
        this.initialState, 
        [...this.cases, {type: actionCreator.type, handler: actionHandler}]
      );
    }
  
    build(): ReduxReducer<STATE, ACTIONS> {
      return createReducer(this.initialState, (builder => {
        this.cases.forEach(({type, handler}) => {
          builder.addCase(type, 
            (state: Draft<STATE>, action: PayloadAction<any, string>) => 
              handler(state, action.payload)
          );
        })
      }))
    }
  }
  `
}

const typeSafeUsage: SnippetConfig = {
  name: "Type-Safe Usage",
  language: "ts",
  snippet: `const reducer = ReducerBuilder.new(0)
  .addCase(incrementAction, (state) => state + 1)
  .addCase(setAction, (state, payload) => payload)
  .build();
  
const oldState = 0;
reducer(oldState, setAction(3));
reducer(oldState, incrementAction());`
}

const invalidUsage: SnippetConfig = {
  name: "Invalid Usage",
  language: "ts",
  snippet: `const oldState = 0;
  reducer(oldState, {
    type: "nonexistent",
    payload: "action"
  });
  
  reducer(oldState, {
    type: "set",
    payload: "1"
  });`
}

const rootReducer: SnippetConfig = {
  name: "Root Reducer",
  language: "ts",
  snippet: `import {
    combineReducers, 
    configureStore, 
    Dispatch, 
    getDefaultMiddleware
  } from "@reduxjs/toolkit";
  import { useDispatch } from "react-redux";
  
  export type RootState = {
      world: ReturnType<typeof worldReducer>;
      player: ReturnType<typeof playerReducer>;
  };
  
  export type RootActions = 
    Parameters<typeof worldReducer>[1] |
    Parameters<typeof playerReducer>[1];
  
  export const rootReducer = combineReducers<RootState, RootActions>({
    world: worldReducer,
    player: playerReducer
  });
  
  export const rootStore = configureStore<RootState, RootActions, any>({
    reducer: rootReducer,
    middleware: [
      ...getDefaultMiddleware<RootState>()
    ] as const
  });
  
  export type AppDispatch = Dispatch<RootActions>;
  export const useAppDispatch = () => useDispatch<AppDispatch>();
  `
}

const rootReducerUsage: SnippetConfig = {
  name: "Root Reducer Usage",
  language: "ts",
  snippet: `const Root: FunctionComponent = () => {
    const dispatch = useAppDispatch();
  
    const handleClick = () => {
        return dispatch(playAction())
    }
  
    return <Button onClick={handleClick}>Start</Button>
  }`
}

const internalState: SnippetConfig = {
  name: "Internal State",
  language: "ts",
  snippet: `class Builder {private readonly initialState: STATE;
  private readonly cases: Array<{type: string; handler: ActionHandler<STATE, any>}>;}
  `
}

const construction: SnippetConfig = {
  name: "Instantiation",
  language: "ts",
  snippet: `class Builder{private constructor(
    initialState: STATE, 
    cases: Array<{type: string; handler: ActionHandler<STATE, any>}>
  ) {
    this.initialState = initialState;
    this.cases = cases;
  }
  
  static new<STATE>(initialState: STATE): ReducerBuilder<STATE, never> {
    return new ReducerBuilder(initialState, [])
  }}`
}

const combinedConstruction: SnippetConfig = {
  name: "Combined Construction",
  language: "ts",
  snippet: `class Builder{private constructor(
    private readonly initialState: STATE, 
    private readonly cases: Array<{type: string; handler: ActionHandler<STATE, any>}>
  ) { }}`
}

const mutator: SnippetConfig = {
  name: "Mutation",
  language: "ts",
  snippet: `function addCase<TYPE extends string, PAYLOAD>(
    actionCreator: ActionCreatorWithPayload<PAYLOAD, TYPE>, 
    actionHandler: ActionHandler<STATE, PAYLOAD>
  ): ReducerBuilder<STATE, ACTIONS | PayloadAction<PAYLOAD, TYPE>> {
    return new ReducerBuilder(
      this.initialState, 
      [...this.cases, {type: actionCreator.type, handler: actionHandler}]
    );
  }
  `
}

const build: SnippetConfig = {
  name: "Build",
  language: "ts",
  snippet: `function build(): ReduxReducer<STATE, ACTIONS> {
    return createReducer(this.initialState, (builder => {
      this.cases.forEach(({type, handler}) => {
        builder.addCase(type, 
          (state: Draft<STATE>, action: PayloadAction<any, string>) => 
            handler(state, action.payload)
        );
      })
    }))
  }`
}

export default {
  actions, createReducer, reducerUsage, invalidAction, invalidPayload, builtInBuilder, builderInvalidActions, typeSafeBuilder, typeSafeUsage, invalidUsage,
  rootReducer, rootReducerUsage, internalState, construction, combinedConstruction, mutator, build
}
