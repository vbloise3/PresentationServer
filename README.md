# PresentationServer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Database Setup

0. Start MongoDb session: mongo
1. Create a database called presentation: use presentation
2. Then create the posts documents: db.posts.insert({title: "Angular/Node/Express/MongoDB Material Design", body: "The tools of the modern web developer", userId: "yoMoFo", Id: "1"})
3. And another: db.posts.insert({title: "Run and Bike forever!", body: "Keep this front of mind every morning.", userId: "yoMoFoKu", Id: "2"})
4. Check to see is all is well: db.posts.find()

Run server and query the database as such: http://localhost:3070/posts

Add some more elements:

db.elements.insert({position:"4",name:"Beryllium",weight:"9.0122",symbol:"Be"})
db.elements.insert({position:"5",name:"Boron",weight:"10.811",symbol:"B"})
db.elements.insert({position:"6",name:"Carbon",weight:"12.0107",symbol:"C"})
db.elements.insert({position:"7",name:"Nitrogen",weight:"14.0067",symbol:"N"})
db.elements.insert({position:"8",name:"Oxygen",weight:"15.9994",symbol:"O"})
db.elements.insert({position:"9",name:"Fluorine",weight:"18.9984",symbol:"F"})
db.elements.insert({position:"10",name:"Neon",weight:"20.1797",symbol:"Ne"})

Add some Npsclients:
db.npsclients.insert({name:"Jane Wagner", department: "Securities Lending", schedule: "2nd Half", relationshipManager: "Vince Bloise"})
db.npsclients.insert({name:"Jim Kearney", department: "Investment Ops", schedule: "1st Half", relationshipOwner: "Andy Lazzaro"})

DeleteOne:
db.npsclients.deleteOne({_id:ObjectId("5a3867d1eaeb5809ca2c87f1")})
