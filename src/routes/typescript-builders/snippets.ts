import { SnippetConfig } from "../../lib/blog/blogData"

const basic: SnippetConfig = {
  name: "Basic",
  language: "ts",
  snippet: `const input = "524";
  const a = input.split("").reverse().join("");
  const b = parseInt(input, 10);
  const c = b * 5;`
}

const reusable: SnippetConfig = {
  name: "Reusable",
  language: "ts",
  snippet: `function process(input: string, radix: number, multiplicand: number) {
    const a = input.split("").reverse().join("");
    const b = parseInt(input, radix);
    const c = b * multiplicand;
    return c;
  }
  process("524", 10, 5);`
}

const singleObject: SnippetConfig = {
  name: "Single Object Config",
  language: "ts",
  snippet: `function process(input: string, radix: number, multiplicand: number) {
    const a = input.split("").reverse().join("");
    const b = parseInt(input, radix);
    const c = b * multiplicand;
    return c;
  }
  process("524", 10, 5);`
}

const factory: SnippetConfig = {
  name: "Pipeline Factory",
  language: "ts",
  snippet: `
  function createPipeline(functions) {
    return function pipeline(initState, config) {
      let state = initState;
      for (func of functions) {
        state = func(state, config);
      }
      return state;
    }
  }
  
  // Or as a long one-liner:
  const createPipeline = initState => functions.reduce((state, func) => func(state, config), initState);`
}

const typescript1: SnippetConfig = {
  name: "Trying TypeScript",
  language: "ts",
  snippet: `function createPipeline<Type, Config>(
    functions: Array<(input: Type, config: Config) => Type>
  ): (input: Type, config: Config) => Type { }`
}

const completeness: SnippetConfig = {
  name: "Completeness",
  language: "ts",
  snippet: `function createPipeline<Config>(
    functions: Array<(input: any, config: Config) => any>
  ): (input: any, config: Config) => any {/*...*/}`
}

const concatFunction: SnippetConfig = {
  name: "Concatenation Function",
  language: "ts",
  snippet: `function concat(...sections: string[]): string { }
  const output = concat("hi", "my", "pals");`
}

const concatBuilder: SnippetConfig = {
  name: "Concatenation Builder",
  language: "ts",
  snippet: `const output = StringBuilder.new()
  .append("Hi")
  .append("my")
  .append("pals")
  .build();`
}

const mutableGeneric1: SnippetConfig = {
  name: "Mutable Generics 1",
  language: "ts",
  snippet: `const a: StringWrapper = wrap("hello");
  a.set("friends!");`
}

const mutableGeneric2: SnippetConfig = {
  name: "Mutable Generics 2",
  language: "ts",
  snippet: `const a: StringWrapper<"hello"> = wrap("hello");`
}

const mutableGeneric3: SnippetConfig = {
  name: "Mutable Generics 3",
  language: "ts",
  snippet: `const a: StringWrapper<"hello"> = wrap("hello");
  const b: StringWrapper<"friends"> = a.set("friends!");`
}

const mutableGeneric4: SnippetConfig = {
  name: "Mutable Generics 4",
  language: "ts",
  snippet: `const a = wrap("hello")
  .set("there")
  .set("friends!");`
}

const preConfig: SnippetConfig = {
  name: "Pre Config",
  language: "ts",
  snippet: `function multiply(input: number, multiplicand: number): number { }
  /*...*/
  type Pipeline = (input: number, multiplicand: number, radix: number, /*...*/) => number;`
}

const postConfig: SnippetConfig = {
  name: "Post Config",
  language: "ts",
  snippet: `function multiply(input: number, config: {multiplicand: number}): number { }
  /*...*/
  type Pipeline = (input: number, config: {
    multiplicand: number; 
    radix: number; 
    /*...*/
  }) => number;`
}

const builderClass: SnippetConfig = {
  name: "Builder Class",
  language: "ts",
  snippet: `class PipelineBuilder<Input, Config extends Record<string, any>, Output> { }`
}

const buildDefinition: SnippetConfig = {
  name: "Build Definition",
  language: "ts",
  snippet: `function build(): (input: Input, config: Config) => Output { }`
}

const appendDefinition: SnippetConfig = {
  name: "Append Definition",
  language: "ts",
  snippet: `function append<NewConfig extends Record<string, any>, NewOutput>(
    func: (state: Output, config: NewConfig) => NewOutput
  ): PipelineBuilder<Input, Config & NewConfig, NewOutput> { }`
}

const stages: SnippetConfig = {
  name: "Stage",
  language: "ts",
  snippet: `class PipelineBuilder<Input, Config extends Record<string, any>, Output> { private readonly stages: Array<(state: any, config: Config) => any>;}
  `
}

const constructor: SnippetConfig = {
  name: "Constructor",
  language: "ts",
  snippet: `class PipelineBuilder<Input, Config extends Record<string, any>, Output> { private constructor(stages: Array<(state: any, config: Config) => any>) { }}`
}

const staticInstantiator: SnippetConfig = {
  name: "Static Instantiator",
  language: "ts",
  snippet: `class PipelineBuilder<Input, Config extends Record<string, any>, Output> { static new<Input>(): PipelineBuilder<Input, {}, Input> { }}`
}

const inferredGenerics: SnippetConfig = {
  name: "Inferred Generics",
  language: "ts",
  snippet: `class PipelineBuilder<Input, Config extends Record<string, any>, Output> { static new<Input, Config extends Record<string, any>, Output>(
    stage: (state: Input, config: Config) => Output
  ): PipelineBuilder<Input, Config, Output> { }}`
}

const implementation: SnippetConfig = {
  name: "Implementation",
  language: "ts",
  snippet: `class PipelineBuilder<Input, Config extends Record<string, any>, Output> {
    private readonly stages: Array<(state: any, config: Config) => any>;
  
    private constructor(stages: Array<(state: any, config: Config) => any>) {
      this.stages = stages;
    }
    
    static new<Input>(): PipelineBuilder<Input, {}, Input> {
      return new PipelineBuilder([]);
    }
  
    append<NewConfig extends Record<string, any>, NewOutput>(
      newStage: (state: Output, config: NewConfig) => NewOutput
    ): PipelineBuilder<Input, Config & NewConfig, NewOutput> {
      const newStages: Array<(state: any, config: Config & NewConfig) => any> = this.stages.slice();
      newStages.push(newStage);
      return new PipelineBuilder<Input, Config & NewConfig, NewOutput>(newStages);
    }
  
    build(): (input: Input, config: Config) => Output {
      return (input: Input, config: Config) => 
        this.stages.reduce((state, stage) => stage(state, config), input);
    }  
  }`
}

const usage: SnippetConfig = {
  name: "Usage",
  language: "ts",
  snippet: `function reverse(input: string) {
    return input.split("").reverse().join("");
  }
  
  function toInt(input: string, config: {radix: number}) {
    return parseInt(input, config.radix);
  }
  
  function multiply(input: number, config: {multiplicand: number}) {
    return input * config.multiplicand;
  }
  
  const pipeline = PipelineBuilder
    .new<string>()
    .append(reverse)
    .append(toInt)
    .append(multiply)
    .build();
  
  const output: number = pipeline("532", {
    radix: 10,
    multiplicand: 5
  })`
}

const error1: SnippetConfig = {
  name: "Invalid first pipeline stage",
  language: "ts",
  snippet: `const pipeline = PipelineBuilder
  .new<string>()
  .append(multiply)`
}

const error2: SnippetConfig = {
  name: "Invalid second pipeline stage",
  language: "ts",
  snippet: `const pipeline = PipelineBuilder
  .new<string>()
  .append(toInt)
  .append(toInt)`
}

const error3: SnippetConfig = {
  name: "Invalid type on output",
  language: "ts",
  snippet: `const pipeline = PipelineBuilder
  .new<string>()
  .append(reverse)
  .build();

const output: number = pipeline("532", {})`
}

const error4: SnippetConfig = {
  name: "Invalid pipeline input",
  language: "ts",
  snippet: `const output: number = pipeline(532, {
    radix: 10,
    multiplicand: 5
  })`
}

const error5: SnippetConfig = {
  name: "Invalid config",
  language: "ts",
  snippet: `const output: number = pipeline("532", {
    multiplicand: 5
  })`
}

const error6: SnippetConfig = {
  name: "Reusing Builders",
  language: "ts",
  snippet: `const a = PipelineBuilder.new<string>();
  const b = a.append((input: string, config: {}) => parseInt(input));
  const pipeline = a.build();`
}

const error7: SnippetConfig = {
  name: "Mutable Stages",
  language: "ts",
  snippet: `function append(/*...*/) {
    stages.append(func);
    return new PipelineBuilder(stages);
  }`
}

const complex: SnippetConfig = {
  name: "Black Magic Code",
  language: "ts",
  snippet: `type Tail<XS extends readonly any[]> = XS extends readonly [any, ...infer T] ? T : [];
  type Last<XS extends readonly any[]> = XS extends readonly [...infer _, infer X] ? X : never;
  type UnionToIntersection<U> = (U extends any ? (k: U)=>void : never) extends ((k: infer I)=>void) ? I : never;
  type Equal<A, B> = A extends B ? B extends A ? true : false : false;
  
  type PipelineStage<Input, Config extends Record<any, unknown>, Output> = (input: Input, config: Config) => Output;
  
  type Input<Stage extends PipelineStage<any, any, any>> = Parameters<Stage>[0];
  type Config<Stage extends PipelineStage<any, any, any>> = Parameters<Stage>[1];
  type Output<Stage extends PipelineStage<any, any, any>> = ReturnType<Stage>;
  type PipelineInput<Stages extends readonly [PipelineStage<any, any, any>, ...any[]]> = Input<Stages[0]>;
  type PipelineConfig<Stages extends readonly PipelineStage<any, any, any>[]> = UnionToIntersection<Config<Stages[number]>>;
  type PipelineOutput<Stages extends readonly PipelineStage<any, any, any>[]> = Output<Last<Stages>>;
  
  type Match<First extends PipelineStage<any, any, any>, Second extends PipelineStage<any, any, any>> = Equal<Output<First>, Input<Second>>;
  type ValidPipeline<Stages extends readonly PipelineStage<any, any, any>[]> =
    Stages extends readonly [any] ? true
    : Stages extends readonly [any, any, ...any[]] ? Match<Stages[0], Stages[1]> extends true ? ValidPipeline<Tail<Stages>>
    : false : false;
  
  type Pipeline<Stages extends readonly PipelineStage<any, any, any>[]> = ValidPipeline<Stages> extends true ? Stages : never;
  
  function createPipeline<Stages extends readonly [PipelineStage<any, any, any>, ...PipelineStage<any, any, any>[]]>(...pipeline: Pipeline<Stages>): (input: PipelineInput<Stages>, config: PipelineConfig<Stages>) => PipelineOutput<Stages> {
    return (input: PipelineInput<Stages>, config: PipelineConfig<Stages>) => {
      let state: any = input;
      for(const stage of pipeline) {
        state = stage(state, config)
      }
      return state;
    }
  }
  
  function reverse(input: string, config: {}) {
    return input.split("").reverse().join("");
  }
  
  function toInt(input: string, config: {radix: number}) {
    return parseInt(input, config.radix);
  }
  
  function multiply(input: number, config: {multiplicand: number}) {
    return input * config.multiplicand;
  }
  
  const pipeline = createPipeline(reverse, toInt, multiply);
  const output = pipeline("524", {radix: 10, multiplicand: 5});`
}

export default { 
  basic,
  reusable,
  singleObject,
  factory,
  typescript1,
  completeness,
  concatFunction,
  concatBuilder,
  mutableGeneric1,
  mutableGeneric2,
  mutableGeneric3,
  mutableGeneric4,
  preConfig,
  postConfig,
  builderClass,
  buildDefinition,
  appendDefinition,
  stages,
  constructor,
  staticInstantiator,
  inferredGenerics,
  implementation,
  usage,
  error1,
  error2,
  error3,
  error4,
  error5,
  error6,
  error7,
  complex
}
