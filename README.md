# Dynamic Form

This codebase is meant to demonstrate an issue I am having generating dynamic forms.

## Setting up the codebase

Please run `npm install` and then `npm run start` and you will see the problem.

## What I'm trying to do

I am trying to generate dynamic forms based on a set of [questions](./src/app/models.ts#L15) I receive from an API.

When the app inits I will dispatch a state action that will call the mock API to get the questions and then the questions are stored in state ([ngxs](https://ngxs.io)).

Then I will give those questions to the [Section component](./src/app/section/section.ts)

The [Section component](./src/app/section/section.ts#L31) then turns the array of questions into a [Custom Form Group](./src/app/models.ts#L57) and each [question](./src/app/models.ts#L15) is turned into a [Custom Form Control](./src/app/models.ts#L56).

the [Section component](./src/app/section/section.html#L4) uses a @for loop to iterate over the controls of the form group and turns them into a [Control Component](./src/app/control/control.ts).

The [Control Component](./src/app/control/control.html#L3) uses the `ng-content` tag to dynamically render each control.

<b>The main thing that I'm trying to accomplish is to have dynamic Date Formats by dynamically injecting MAT_DATE_FORMATS into the component when we are rendering a Date Field.

However I keep running into the following error:</b>

<img src="./images/error.png" />

## What I've tried

To get the dynamic date formats I've tried updating the MAT_DATE_FORMATS in the Date Field component.

```typescript
  formats = inject(MAT_DATE_FORMATS);

  constructor() {
    super();

    afterNextRender(() => {
      const format = this.control().question.dateFormat;

      if (format) {
        this.formats.display.dateInput = format;
        this.formats.parse.dateInput = format;
      }
    });
  }
```

However, if there were multiple date fields in the Questions array then the last date field format would override all the other date fields. That is what led me to try and render the components dynamically using `ng-content`.