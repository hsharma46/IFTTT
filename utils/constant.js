const _collections = {
  ALEXA: "Alexa",
  CONFIG:'Config',
  COORDINATES:'Coordinates'
};

const _robotCommand={
    CANCEL:'cancel',
    MOVE:'move',
    PAUSE:'pause',
    RESUME:'resume',
}

const _configType={
    RABBIT_MQ:'rabbitmq',
    GMAIL:'gmail'
}

const _methodType = {
    POST:'post',
    GET:'get'
}

const _config={
    MONGO_DB:"mongodb+srv://ParasMongoDB:ZCcF6nKxSo1AvOFc@Cluster0.ansvqnc.mongodb.net/?retryWrites=true&w=majority"
}

module.exports = {
    COLLLECTIONS: _collections,
    METHOD_TYPES: _methodType,
    ROBOT_COMMAND: _robotCommand,
    CONFIG:_config,
    CONFIG_TYPE:_configType
}
