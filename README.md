# mock-data-generator

Simple extension to generate mock data for emergency

give the mock data strucuture (array of object)

```
[{
  "name": "test",
  "age": 200,
  "height": 1,
  "bio": "This is a sample text"
}]

```
and generate using **ctrl+shift+p > Generate mock data** and give the number of records to be generated. When the value is string (in array of object) the maximum length of text generated depends on the one given by user.

![alt text](https://raw.githubusercontent.com/Rafi993/vscode_mock_data_generator/master/screen.gif)

This extension simple CFG grammar to generate string in mock data please feel free to change the grammar