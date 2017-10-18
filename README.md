# search-ui-tests

Testing framework for the Coveo JavaScript Search Framework

## Usage

Include the compiled `bin/js/CoveoJsSearchTests.js` file in your test configuration.

## TypeScript

You can import references from the component and then use them in your tests.

### Example

In this example, `MyCustomComponent` is a simple custom component that registers a new event handler on the `onBuildingQuery` event to change the pipeline.

```typescript
// MyCustomComponent.ts
import {
    Component,
    ComponentOptions,
    IComponentBindings,
    QueryEvents,
    IBuildingQueryEventArgs
} from "coveo-search-ui";

export class MyCustomComponent extends Component {
    static ID = "MyCustomComponent";

    static options: IMyCustomComponentOptions = {} 

    constructor(public element: HTMLElement, public options: IMyCustomComponentOptions, public bindings: IComponentBindings) {
        super(element, MyCustomComponent.ID, bindings);
        this.options = ComponentOptions.initComponentOptions(element, MyCustomComponent, options);

        this.bind.onRootElement(QueryEvents.buildingQuery, (args: IBuildingQueryEventArgs) => args.queryBuilder.pipeline = "a new pipeline");
    }
}
```

And here is the test to validate this behavior.

```typescript
// MyCustomComponent.spec.ts
import { MyCustomComponent } from "./MyCustomComponent";
import { Mock, Simulate } from "coveo-search-ui-tests";

describe("MyCustomComponent", () => {
    let component: Mock.IBasicComponentSetup<MyCustomComponent>;

    beforeEach(() => {
        // Creates the component with all the set up required to run properly in a fake Coveo Search Interface environment.
        component = Mock.basicComponentSetup<MyCustomComponent>(CoveoForSitecoreContext);
    });

    afterEach(() => {
        component = null;
    });

    it("should change the pipeline in the query builder", () => {
        const expectedPipeline = "a new pipeline";

        // Simulate a query executed in the fake environment.
        const result = Simulate.query(component.env);

        expect(result.queryBuilder.pipeline).toBe(expectedPipeline);
    });
});
```

## Modules

### Mock

Allows to create mocks of components required for the framework.

### Fake

Allows to create fake objects like results, events and fields.

### Simulate

Allows to simulate some actions in the framework or in the browser.