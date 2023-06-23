import { Helper } from "../classes/Helper";
import { Messages } from "../constants/Messages";
import { Complaint, complainFormSchema } from "../models/formModels";
import { HttpStatuses } from "../interfaces/IHttpStatuses";

export const ComplainFormRegisterService = async (
    params: Complaint,
    callBack: Function
  ) => {
    try {
      await complainFormSchema.create(params);
      callBack(true);
    } catch (error) {
      callBack(error);
    }
  };


  export const GetComplainDataService = async (
    search: string,
    page: number,
    limit: number,
    callBack: Function
  ) => {
    try {
      let query: any = {}; // Initialize an empty query
  
      if (search) {
        query = { $text: { $search: search } };
      }
  
      const totalCount = await complainFormSchema.countDocuments(query);
      const totalPages = Math.ceil(totalCount / limit);
  
      const complaints = await complainFormSchema
        .find(query)
        .skip((page - 1) * limit)
        .limit(limit);
  
      callBack(complaints, totalCount, page, totalPages);
    } catch (error) {
      callBack(error);
    }
  };
  