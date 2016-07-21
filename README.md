#  Offer Generator

A React Component that allows you to construct ODRL licence offers in json-ld format.

+ [Acronyms](#acronyms)
+ [Using the Offer Generator](#using-the-offer-generator)
+ [Developing the Offer Generator](#developing-the-offer-generator)

## Acronyms

| Acronym | Description                   |
| :------ | :----------                   |
| ODRL    | Open Digital Rights Language  |

## Using the Offer Generator
A full example can be found in the [example](https://github.com/openpermissions/offer-generator/tree/master/example) directory.

### Install
Start by installing the offer-generator via npm:
```
npm install offer-generator --save
```

### Render
The offer-generator package provides two main components:

+ **OfferGenerator**: The main building tool for constructing an ODRL offer.
+ **JsonLDViewer**: A helper component that can be used to display the json-ld constructed by the offer builder

Both use bootstrap components and class names. 
For details on how to customise the css please refer to the [Bootstrap](http://getbootstrap.com) documentation.

#### Offer Generator
This is the main building tool for constructing an ODRL offer. 


```javascript
{OfferGenerator} = require('offer-generator');
class Component extends React.Component {
    render: function () {
        return (
            <div>
                <OfferGenerator />
            </div>
        );
    }
} 
```

##### API

###### onCreate

Pass a function to call when the button is clicked. The function will receive the json-ld offer as a parameter.
Use this function to retrieve the end result offer, and process it as needed.

+ *Type:* function
+ *Required:* yes
+ *Default:* undefined

```javascript
{OfferGenerator} = require('offer-generator');
class Component extends React.Component {
    render: function () {
        return (
            <div>
                <OfferGenerator 
                    onCreate={(json) => {this.setState({json: json})}}
                    />
            </div>
        );
    }
} 
```

###### buttonText
This controls the text that is displayed on the main creation button of the builder. 

+ *Type:* string
+ *Required:* no
+ *Default:* 'Generate Offer'

```javascript
{OfferGenerator} = require('offer-generator');
class Component extends React.Component {
    render: function () {
        return (
            <div>
                <OfferGenerator 
                    buttonText='Save Offer'
                    />
            </div>
        );
    }
} 
```

###### assigner
This provides a default assigner id for the offer builder. If provided then the assigner will be displayed but will not be editable within the builder.

+ *Type:* string
+ *Required:* no
+ *Default:* undefined

```javascript
{OfferGenerator} = require('offer-generator');
class Component extends React.Component {
    render: function () {
        return (
            <div>
                <OfferGenerator 
                    assigner='my-test-assigner'
                    />
            </div>
        );
    }
} 
```

###### initialOffer
This provides an initial offer to populate the offer builder with on initialisation.

+ *Type:* json-ld object
+ *Required:* no
+ *Default:* undefined

```javascript
{OfferGenerator} = require('offer-generator');
class Component extends React.Component {
    render: function () {
        return (
            <div>
                <OfferGenerator 
                    initialOffer={this.state.offer}
                    />
            </div>
        );
    }
} 
```

#### JSON-ld Viewer
```javascript
{JsonLdViewer} = require('offer-generator');
class Component extends React.Component {
    render: function () {
        return (
            <div>
                <JsonLdViewer
                      jsonld={this.state.jsonld}
                    />
            </div>
        );
    }
} 
```
##### API

###### jsonld

Pass the json ld to display.

+ *Type:* json-ld object
+ *Required:* yes
+ *Default:* undefined


## Developing the Offer Generator

The UI is implemented completely in JavaScript using

+ [React.js](http://facebook.github.io/react/)
+ [Redux.js](http://redux.js.org/)
+ [Immutable.js](http://facebook.github.io/immutable-js/)

###  Getting Started

Download & install [node & npm](http://nodejs.org/download/) or use your
package manager of choice e.g.

```bash
brew install node
```

###  Install dependencies

```bash
npm install
```

### Build

#### Transpile code using babel

```bash
npm run build
```

#### Build example application for deployment

Either run this

```bash
cd example
npm install
npm run build
```

#### Build example application for testing during development

+ Remove node_modules sub-directory from example directory.
+ In example/src/index.js, change 

```{OfferGenerator, JsonLdViewer} = require('offer-generator');```

to 

``` {OfferGenerator, JsonLdViewer} = require('../../src');```


+ In top level directory either run this

```bash
npm run build-example
```

or this, if you require automatic rebuild of the bundle whenever there are file
changes

```bash
npm run build-example:watch
```

### Running the example

You need a web server to serve index.html. We recommend you use python's HTTP Server e.g: 

```
python -m SimpleHTTPServer
```

You should be able to view the application at
[http://localhost:8000](http://localhost:8000).

###  Tests

Unit tests are written using [mocha](https://github.com/mochajs/mocha), which
can be run with

```bash
npm test
```

### Publish to npm
The offer-viewer has been published to npm under the OpenPermissions account. To publish a new version, increase the version number
in package.json and run

```
npm publish ./
```