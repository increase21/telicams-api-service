import { SimpleNodeJsController } from "@increase21/simplenodejs";
import helpers from "../../assets/helpers";
import CountryList from "../../assets/country-list";

export default class ZGateWayRequestController extends SimpleNodeJsController {


  async countryLists() {
    return helpers.outputSuccess(this.res, CountryList)
  }

}
