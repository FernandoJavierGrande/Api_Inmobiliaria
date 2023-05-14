import { DtoSelector } from "../utils/DtoSelector.js";

const validatorBody = (req, res, next) => {
  try {
    const isValid = DtoSelector(req);
    if (!isValid) {
      throw new Error("Endpoint falied");
    }
    const { Dto } = req;

    const ReqBody = req.body;
    const propsDto = Object.keys(Dto.properties);

    if (typeof ReqBody !== Dto.type) {
      return res.status(400).json("Body request must be in json format");
    }

    const bodyPropsNames = Object.keys(ReqBody);

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
