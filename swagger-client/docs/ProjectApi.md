# Rhmhcp.ProjectApi

All URIs are relative to *http://localhost:10010/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createProject**](ProjectApi.md#createProject) | **POST** /project | Create a project
[**deleteProject**](ProjectApi.md#deleteProject) | **DELETE** /project/{projectId} | 
[**listProjects**](ProjectApi.md#listProjects) | **GET** /project | List all projects


<a name="createProject"></a>
# **createProject**
> createProject(body)

Create a project

### Example
```javascript
var Rhmhcp = require('rhmhcp');

var apiInstance = new Rhmhcp.ProjectApi();

var body = new Rhmhcp.Body(); // Body | The project to be created


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.createProject(body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**Body**](Body.md)| The project to be created | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: text/plain

<a name="deleteProject"></a>
# **deleteProject**
> deleteProject(projectId)



### Example
```javascript
var Rhmhcp = require('rhmhcp');

var apiInstance = new Rhmhcp.ProjectApi();

var projectId = "projectId_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.deleteProject(projectId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **projectId** | **String**|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: text/plain

<a name="listProjects"></a>
# **listProjects**
> [InlineResponse200] listProjects()

List all projects

### Example
```javascript
var Rhmhcp = require('rhmhcp');

var apiInstance = new Rhmhcp.ProjectApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listProjects(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**[InlineResponse200]**](InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/plain

