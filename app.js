var PROTO_PATH = __dirname + '/protos/calc.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(PROTO_PATH);
var calc_proto = grpc.loadPackageDefinition(packageDefinition).calc;

/**
 * Implements the RPC method.
*/
function add(call, callback) {
  var number1 = parseInt(call.request.number1)
  var number2 = parseInt(call.request.number2)
  try {
    if(!isNaN(number1) && !isNaN(number2)) {
      var result = number1 + number2
      
      callback(null, {
          message: 'The result is ' + result,
          result: result
      });
    
    } else {
      callback(null, {
        message: 'Please specify two numbers'
      });
    }
  } catch(e) {
    callback(null, {
      message: 'An error occured'
    });
  }
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
*/
var server = new grpc.Server();
server.addService(calc_proto.CalcService.service, {add: add});
server.bindAsync('0.0.0.0:40000', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
});
