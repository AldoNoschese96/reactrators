# Reactrators - A React Component Enhancement Library

**Reactrators** is a powerful React library that simplifies the process of composing and enhancing React components with flexible and chainable functions. This library provides a composable utility for building component enhancers, making it easier to inject functionality and props into React components. Whether you're looking to streamline your component composition or create complex component hierarchies, Reactrators has you covered.

## Features

- **Function Composition**: Compose multiple functions to enhance your components, making it easy to build complex functionalities.

- **Component Composition**: Simplify the process of composing components by enhancing them with composable functions.

- **Chainable**: Easily chain multiple enhancers together to create a custom enhancer pipeline.

- **Props Injection**: Inject props into your components effortlessly, providing them with the data they need.

- **Component Utilities**: Utilize various utility functions to simplify your component development.

## Installation

You can install Reactrators via npm or yarn:

```bash
npm install reactrators
yarn add reactrators


```jsx
const Template = ({ films = [] }) => {
  return (
    <div>
      {films.map((film: any) => (
        <p key={film}>{film}</p>
      ))}
    </div>
  );
};
const useSwapi = () => {
  const { data, isLoading, isError } = useQuery(['people'], fetchPeople);
  return {
    data,
    isLoading,
    isError
  }
};
const FilmsDTO = ({ data, isLoading = false, isError = false }): any => {
  if(data) {
    return { url: data?.url, films: data?.films };
  }
  return { films: [] };
};

export const MyComponentOverriding = composable((props: any) => (
  [useSwapi, FilmsDTO]
), {
  chainable: true,
})(Template);
```
