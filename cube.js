"use strict";
//variables to store the HTML canvas element and WebGL context, respectively.
var canvas;
var gl;

var scale = 1.0 ;
var translation = 0.0;
var axis=0 ; 

//total number of vertices in the cube 6*6
var NumVertices  = 36;

//arrays will store the vertices and colors of the cube
var points = [];
var colors = [];
var sa = [1,1,1];
var d = [0,0,0];


//constants representing the X, Y, and Z axes
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

//the current rotation axis
var axis = 0;
//array storing the rotation angles around each axis
var theta = [ 0, 0, 0 ];

//variable to store the location of the rotation angle uniform variable in the shaders.
var thetaLoc;
var saLoc;
var dLoc;
//time delay between each frame of the animation.
var myTimeOut=100;



window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //function is used to initialize the geometry and colors of a cube 
    colorCube();

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    
    gl.enable(gl.DEPTH_TEST);

    
    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    //method to get the location of a uniform variable in a shader program.
    thetaLoc = gl.getUniformLocation(program, "theta");
    saLoc = gl.getUniformLocation(program, "sa");
    dLoc = gl.getUniformLocation(program, "d");


    //event listeners for buttons
    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
    };

    // trasnlation , scale ----------------------------------------
    document.getElementById( "MoveRight" ).onclick = function () {
       translation += 0.1;
    };
 
    document.getElementById( "MoveLeft" ).onclick = function () {
        translation -= 0.1;
    };

    document.getElementById( "scaleIN" ).onclick = function () {
        scale -=0.1
    };

    document.getElementById( "ScaleOUT" ).onclick = function () {
        scale += 0.1;
    };
    //---------------------------------------------------------------


    document.getElementById( "StopButton" ).onclick = function () {
        myTimeOut = 100000;
    };

    document.getElementById( "MoveButton" ).onclick = function () {
        myTimeOut = 10;
        render();
    };

    document.getElementById( "SlowButton" ).onclick = function () {
        myTimeOut = 100;
        render();
    };

    render();
}

function colorCube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}

function quad(a, b, c, d)
{
    var vertices = [
        vec4( -0.5, -0.5,  0.5, 1.0 ),
        vec4( -0.5,  0.5,  0.5, 1.0 ),
        vec4(  0.5,  0.5,  0.5, 1.0 ),
        vec4(  0.5, -0.5,  0.5, 1.0 ),
        vec4( -0.5, -0.5, -0.5, 1.0 ),
        vec4( -0.5,  0.5, -0.5, 1.0 ),
        vec4(  0.5,  0.5, -0.5, 1.0 ),
        vec4(  0.5, -0.5, -0.5, 1.0 )
    ];

    var vertexColors = [
        [ 0.0, 0.0, 0.0, 1.0 ],  // black
        [ 1.0, 0.0, 0.0, 1.0 ],  // red
        [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
        [ 0.0, 1.0, 0.0, 1.0 ],  // green
        [ 0.0, 0.0, 1.0, 1.0 ],  // blue
        [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
        [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
        [ 1.0, 1.0, 1.0, 1.0 ]   // white
    ];

    // We need to parition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices

    //vertex color assigned by the index of the vertex
    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
        points.push( vertices[indices[i]]);
        //colors.push( vertexColors[indices[i]] );

        // for solid colored faces use
        colors.push(vertexColors[a]);

    }
}

function render()
{

    setTimeout(
    function() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
    theta[axis] += 2.0;
    d[0] = translation;
  
    sa=vec3(scale,scale,scale);
    
    gl.uniform3fv(saLoc, sa);
    gl.uniform3fv(dLoc, d);
    gl.uniform3fv(thetaLoc, theta);
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );


    requestAnimFrame( render );
    },myTimeOut)
}
