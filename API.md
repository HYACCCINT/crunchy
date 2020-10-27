Simple Api for SDC\_Form\_Manager
=================================

Version: 1.0.0

BasePath:/crunchycoders9/SDC\_Form\_Manager/1.0.0

Apache 2.0

http://www.apache.org/licenses/LICENSE-2.0.html

Methods
-------

#### [Developers]
*   [`post /graphQL`]
*   [`delete /graphQL`]

#### [Default]
*   [`get /graphQL`]


======
### Developers
======


## `post /graphQL`

* Updates a document to the database

##### `Consumes`

This API call consumes the following media types via the Content-Type request header:

*   `application/json`

##### `Request body`

body : [SDCForm/SDCQuestion/SDCSection]

Body Parameter — Document object to mutate/update

## Responses

##### `200/204`

* document successfully updated

##### `400`

* invalid request, request rejected by backend/database

##### `500`

* could not find server/database

======

## `delete /graphQL`

* Deletes documents with sepcified ID from database



##### `Query parameters`

* id (required)

* Query Parameter — ID of the form that needs to be deleted

## Responses

##### 200

* Document has been successfully deleted

##### `400`

* invalid request, request rejected by backend/database

##### `500`

* could not find server/database
* * *

==========
### Default
==========

## `get/graphQL`

* Queries for document with specified parameters within database

##### `Query parameters`

* id / procedureID / title / name

* Query Parameter — use any combination of id/ procedureID/ title/ name to query specified document(s) from the database

##### Return type

* array\[[SDCForm]\]

##### Example data

Content-Type: application/json

    [ {
      "ProcedureId" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
      "Sections" : [ {
        "MustImplement" : true,
        "Subsections" : [ null, null ],
        "Title" : "Title",
        "Questions" : [ {
          "TextAfterResponse" : "TextAfterResponse",
          "IsEnabled" : true,
          "Title" : "Title",
          "Properties" : [ null, null ],
          "Name" : "Name",
          "MustImplement" : true,
          "Type" : "Type",
          "oneof" : {
            "Attributes" : {
              "FormResponseId" : 2.027123023002322,
              "QuestionId" : 4.145608029883936
            }
          },
          "MaxCard" : 9,
          "Questionid" : 3.616076749251911,
          "MinCard" : 7,
          "SectionId" : 2.3021358869347655,
          "SubQuestions" : [ null, null ]
        }, {
          "TextAfterResponse" : "TextAfterResponse",
          "IsEnabled" : true,
          "Title" : "Title",
          "Properties" : [ null, null ],
          "Name" : "Name",
          "MustImplement" : true,
          "Type" : "Type",
          "oneof" : {
            "Attributes" : {
              "FormResponseId" : 2.027123023002322,
              "QuestionId" : 4.145608029883936
            }
          },
          "MaxCard" : 9,
          "Questionid" : 3.616076749251911,
          "MinCard" : 7,
          "SectionId" : 2.3021358869347655,
          "SubQuestions" : [ null, null ]
        } ],
        "ID" : "ID",
        "Mincard" : 5,
        "Maxcard" : 5,
        "Name" : "Name"
      }, {
        "MustImplement" : true,
        "Subsections" : [ null, null ],
        "Title" : "Title",
        "Questions" : [ {
          "TextAfterResponse" : "TextAfterResponse",
          "IsEnabled" : true,
          "Title" : "Title",
          "Properties" : [ null, null ],
          "Name" : "Name",
          "MustImplement" : true,
          "Type" : "Type",
          "oneof" : {
            "Attributes" : {
              "FormResponseId" : 2.027123023002322,
              "QuestionId" : 4.145608029883936
            }
          },
          "MaxCard" : 9,
          "Questionid" : 3.616076749251911,
          "MinCard" : 7,
          "SectionId" : 2.3021358869347655,
          "SubQuestions" : [ null, null ]
        }, {
          "TextAfterResponse" : "TextAfterResponse",
          "IsEnabled" : true,
          "Title" : "Title",
          "Properties" : [ null, null ],
          "Name" : "Name",
          "MustImplement" : true,
          "Type" : "Type",
          "oneof" : {
            "Attributes" : {
              "FormResponseId" : 2.027123023002322,
              "QuestionId" : 4.145608029883936
            }
          },
          "MaxCard" : 9,
          "Questionid" : 3.616076749251911,
          "MinCard" : 7,
          "SectionId" : 2.3021358869347655,
          "SubQuestions" : [ null, null ]
        } ],
        "ID" : "ID",
        "Mincard" : 5,
        "Maxcard" : 5,
        "Name" : "Name"
      } ],
      "releaseDate" : "2016-08-29T09:12:33.001Z",
      "MetaProperties" : {
        "Version" : 0.8008281904610115,
        "Title" : "Appendix form",
        "URI" : "URI",
        "properties" : {
          "Order" : 6.027456183070403,
          "Val" : "Val",
          "Type" : "Type",
          "PropName" : "PropName",
          "Propclass" : "Propclass",
          "Name" : "Name"
        }
      },
      "PatientId" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
      "name" : "Widget Adapter",
      "Footer" : "Footer",
      "Contact" : {
        "emails" : [ {
          "Name" : "Name"
        }, {
          "Name" : "Name"
        } ],
        "OrganizationNmae" : "OrganizationNmae"
      },
      "BodyProperties" : {
        "Title" : "Title",
        "Id" : 1.4658129805029452,
        "Properties" : [ null, null ]
      }
    }, {
      "ProcedureId" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
      "Sections" : [ {
        "MustImplement" : true,
        "Subsections" : [ null, null ],
        "Title" : "Title",
        "Questions" : [ {
          "TextAfterResponse" : "TextAfterResponse",
          "IsEnabled" : true,
          "Title" : "Title",
          "Properties" : [ null, null ],
          "Name" : "Name",
          "MustImplement" : true,
          "Type" : "Type",
          "oneof" : {
            "Attributes" : {
              "FormResponseId" : 2.027123023002322,
              "QuestionId" : 4.145608029883936
            }
          },
          "MaxCard" : 9,
          "Questionid" : 3.616076749251911,
          "MinCard" : 7,
          "SectionId" : 2.3021358869347655,
          "SubQuestions" : [ null, null ]
        }, {
          "TextAfterResponse" : "TextAfterResponse",
          "IsEnabled" : true,
          "Title" : "Title",
          "Properties" : [ null, null ],
          "Name" : "Name",
          "MustImplement" : true,
          "Type" : "Type",
          "oneof" : {
            "Attributes" : {
              "FormResponseId" : 2.027123023002322,
              "QuestionId" : 4.145608029883936
            }
          },
          "MaxCard" : 9,
          "Questionid" : 3.616076749251911,
          "MinCard" : 7,
          "SectionId" : 2.3021358869347655,
          "SubQuestions" : [ null, null ]
        } ],
        "ID" : "ID",
        "Mincard" : 5,
        "Maxcard" : 5,
        "Name" : "Name"
      }, {
        "MustImplement" : true,
        "Subsections" : [ null, null ],
        "Title" : "Title",
        "Questions" : [ {
          "TextAfterResponse" : "TextAfterResponse",
          "IsEnabled" : true,
          "Title" : "Title",
          "Properties" : [ null, null ],
          "Name" : "Name",
          "MustImplement" : true,
          "Type" : "Type",
          "oneof" : {
            "Attributes" : {
              "FormResponseId" : 2.027123023002322,
              "QuestionId" : 4.145608029883936
            }
          },
          "MaxCard" : 9,
          "Questionid" : 3.616076749251911,
          "MinCard" : 7,
          "SectionId" : 2.3021358869347655,
          "SubQuestions" : [ null, null ]
        }, {
          "TextAfterResponse" : "TextAfterResponse",
          "IsEnabled" : true,
          "Title" : "Title",
          "Properties" : [ null, null ],
          "Name" : "Name",
          "MustImplement" : true,
          "Type" : "Type",
          "oneof" : {
            "Attributes" : {
              "FormResponseId" : 2.027123023002322,
              "QuestionId" : 4.145608029883936
            }
          },
          "MaxCard" : 9,
          "Questionid" : 3.616076749251911,
          "MinCard" : 7,
          "SectionId" : 2.3021358869347655,
          "SubQuestions" : [ null, null ]
        } ],
        "ID" : "ID",
        "Mincard" : 5,
        "Maxcard" : 5,
        "Name" : "Name"
      } ],
      "releaseDate" : "2016-08-29T09:12:33.001Z",
      "MetaProperties" : {
        "Version" : 0.8008281904610115,
        "Title" : "Appendix form",
        "URI" : "URI",
        "properties" : {
          "Order" : 6.027456183070403,
          "Val" : "Val",
          "Type" : "Type",
          "PropName" : "PropName",
          "Propclass" : "Propclass",
          "Name" : "Name"
        }
      },
      "PatientId" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
      "name" : "Widget Adapter",
      "Footer" : "Footer",
      "Contact" : {
        "emails" : [ {
          "Name" : "Name"
        }, {
          "Name" : "Name"
        } ],
        "OrganizationNmae" : "OrganizationNmae"
      },
      "BodyProperties" : {
        "Title" : "Title",
        "Id" : 1.4658129805029452,
        "Properties" : [ null, null ]
      }
    } ]

##### Produces

* This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

*   `application/json`

## Responses

##### 200

* Documents matching parameters has been returned by the server

##### `400`

* invalid request, request rejected by backend/database

##### `500`

* could not find server/database

* * *

# Models
------


### Table of Contents

1.  [`SDCQuestion`]
2.  [`SDCSection`]
3.  [`SDCForm`]
4.  [`SDCQuestionResponse`]
5.  [`SDCFormResponse`]






## `[SDCQuestion]` 

##### id

* `String`
* example: "732432.00000"

##### docType

* `String`
* example: "SDCQuestion"

##### name

* `String`
* example: "Frontal lobe XXXX"

##### title

* `String`
* example: "Describe the last time XXXX"

##### mustImplement

* `Boolean`
* example: True

##### readOnly

* `Boolean`
* example: True

##### minCard

* `Int`
* example: 324324

##### maxCard

* `Int`
* example: 324324

##### maxSelections

* `Int`
* example: 0

##### questionType

* `String`
* example: "TextResponse"

##### isEnabled

* `Boolean`
* example: True

##### textAfterResponse

* `String`
* example: "Thank you for your input"


## `[SDCSection]` 

##### id

* `String`
* example: "732432.00000"

##### docType

* `String`
* example: "SDCSection"

##### name

* `String`
* example: "Frontal lobe XXXX"

##### title

* `String`
* example: "Describe the last time XXXX"

##### type

* `String`
* example: "Description of lung"

##### mustImplement

* `Boolean`
* example: True

##### readOnly

* `Boolean`
* example: True

##### minCard

* `Int`
* example: 324324

##### maxCard

* `Int`
* example: 324324

##### questions

* `SDCQuestion[]`
* example: [{id:....}, {id:......}]

##### subsections

* `String[]`
* example: ['3246873246.000', '876873.000']


## `[SDCForm]` 

##### id

* `String`
* example: "732432.00000"

##### docType

* `String`
* example: "SDCForm"

##### procedureID

* `String`
* example: "7234987.0000"

##### patientID

* `String`
* example: "smith7329"

##### lineage

* `String`
* example: "3432324"

##### title

* `String`
* example: "Describe the last time XXXX"

##### uri

* `String`
* example: "http://uewriuewyiewuryiw.udshifis"

##### sections

* `String[]`
* example: ['3246873246.000', '876873.000']


##### footer

* `String`
* example: "Copyright 2020 XXXX"

##### lastModified

* `String`
* example: "2020.10.29.09:44:23:23"

## `SDCQuestionResponse` 

##### id

* `String`
* example: "732432.000001a"

##### questionID

* `String`
* example: "732432.00000"

##### userInput

* `String[]`
* example: ['hearing-loss', 'pain-in-abdoment']

## `SDCQuestionResponse` 

##### id

* `String`
* example: "732432.000001b"

##### formID

* `String`
* example: "732432.00000"

##### formfillerID

* `String`
* example: "randomDoc738"

##### patientID

* `String`
* example: "myPatient738"

##### responses

* `SDCQuestionResponse[]`
* example: [{id:....}, {id:.....}]