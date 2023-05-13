const validatorBody = (req, res, next) => {
  try {
    const { Dto } = req;
    const loginBody = req.body;
    const propsDto = Object.keys(Dto.properties);

    console.log(loginBody);

    if (typeof loginBody !== Dto.type) {
      return res.status(400).json("Body request must be in json format");
    }

    const bodyPropsNames = Object.keys(loginBody);

    const checkProps =
      bodyPropsNames.length === propsDto.length &&
      bodyPropsNames.every((bodyPropsName) => propsDto.includes(bodyPropsName));

    if (!checkProps) {
      return res.status(400).json("Body properties are invalid");
    }
    next();
  } catch (error) {
    return res.status(500).json("Server error, try again later");
  }
};

export default validatorBody;
