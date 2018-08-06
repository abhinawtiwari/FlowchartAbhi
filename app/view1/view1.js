'use strict';

angular.module('FCApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {
  $http.get('/json/json-data1.json').success(function(data){
    var data = data.rules;

    var nodeDataArray1 = [];
    var linkDataArray1 = [];

    function traverse(o) {
        for (var i in o) {
            nodeDataArray1.push({
              'key': o[i].vertex,
              'text': o[i].message.message[0]
            });
            linkDataArray1.push({
              'from': o[i].vertex,
              'to': o[i].tovertex,
              'text': ''
            });
        }
    }

    traverse(data);

    $scope.nodeDataArray1 = nodeDataArray1;
    $scope.linkDataArray1 = linkDataArray1;

      function init() {
        console.log('init method called');
        // if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make;  // for conciseness in defining templates
        var myDiagram =
          $(go.Diagram, "myDiagramDiv",  // must name or refer to the DIV HTML element
            {
              initialAutoScale: go.Diagram.Uniform,  // an initial automatic zoom-to-fit
              contentAlignment: go.Spot.Center,  // align document to the center of the viewport
              layout:
                $(go.ForceDirectedLayout,  // automatically spread nodes apart
                  { maxIterations: 200, defaultSpringLength: 30, defaultElectricalCharge: 100 })
            });
        // define each Node's appearance
        myDiagram.nodeTemplate =
          $(go.Node, "Auto",  // the whole node panel
            { locationSpot: go.Spot.Center },
            // define the node's outer shape, which will surround the TextBlock
            $(go.Shape, "Rectangle",
              { fill: $(go.Brush, "Linear", { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" }), stroke: "black" }),
            $(go.TextBlock,
              { font: "bold 10pt helvetica, bold arial, sans-serif", margin: 4 },
              new go.Binding("text", "text"))
          );
        // replace the default Link template in the linkTemplateMap
        myDiagram.linkTemplate =
          $(go.Link,  // the whole link panel
            $(go.Shape,  // the link shape
              { stroke: "black" }),
            $(go.Shape,  // the arrowhead
              { toArrow: "standard", stroke: null }),
            $(go.Panel, "Auto",
              $(go.Shape,  // the label background, which becomes transparent around the edges
                { fill: null,
                  // $(go.Brush, "Radial", { 0: "rgb(240, 240, 240)", 0.3: "rgb(240, 240, 240)", 1: "rgba(240, 240, 240, 0)" })
                  stroke: null }),
              $(go.TextBlock,  // the label text
                { textAlign: "center",
                  font: "10pt helvetica, arial, sans-serif",
                  stroke: "#555555",
                  margin: 4 },
                new go.Binding("text", "text"))
            )
          );
        // // create the model for the concept map
        // var nodeDataArray = [
        //   { key: 1, text: "Abhinaw" },
        //   { key: 2, text: "Akash" },
        //   { key: 3, text: "Nitesh" },
        //   { key: 4, text: "Utkarsh" },
        //   { key: 5, text: "Raswal" },
        //   { key: 6, text: "Tanvi" },
        //   { key: 7, text: "Gaurav" },
        //   { key: 8, text: "Garg" },
        //   { key: 9, text: "Yogita" },
        //   { key: 10, text: "Nikita" },
        //   { key: 11, text: "Anitha" },
        //   { key: 12, text: "Vipul" },
        //   { key: 13, text: "Arunima" },
        //   { key: 14, text: "Saddam" },
        //   { key: 15, text: "Boro" },
        //   { key: 16, text: "Amit" },
        //   { key: 17, text: "Ghoda" },
        //   { key: 18, text: "Tusar" },
        //   { key: 19, text: "Rajesh" },
        //   { key: 24, text: "Rohit" }
        // ];
        // var linkDataArray = [
        //   { from: 1, to: 2, text: "" },
        //   { from: 2, to: 3, text: "" },
        //   { from: 2, to: 4, text: "" },
        //   { from: 2, to: 5, text: "" },
        //   { from: 2, to: 6, text: "" },
        //   { from: 2, to: 10, text: "" },
        //   { from: 2, to: 12, text: "" },
        //   { from: 4, to: 5, text: "" },
        //   { from: 4, to: 6, text: "" },
        //   { from: 4, to: 7, text: "" },
        //   { from: 4, to: 8, text: "" },
        //   { from: 4, to: 9, text: "" },
        //   { from: 5, to: 9, text: "" },
        //   { from: 5, to: 11, text: "" },
        //   { from: 7, to: 13, text: "" },
        //   { from: 7, to: 14, text: "" },
        //   { from: 7, to: 19, text: "" },
        //   { from: 8, to: 15, text: "" },
        //   { from: 8, to: 16, text: "" },
        //   { from: 9, to: 17, text: "" },
        //   { from: 11, to: 18, text: "" },
        //   { from: 12, to: 19, text: "" },
        //   { from: 17, to: 18, text: "" },
        //   { from: 18, to: 24, text: "" }
        // ];
        // console.log('Logging nodeDataArray1');
        // console.log($scope.nodeDataArray1);
        // console.log('Logging linkDataArray1');
        // console.log($scope.linkDataArray1);
        myDiagram.model = new go.GraphLinksModel(nodeDataArray1, linkDataArray1);
      }
      init();
  });
}]);
