import { SimpleNodeJsController } from "@increase21/simplenodejs";
import helpers from "../../assets/helpers";
import { OperatorAssetService } from "../../services/opt-assets";

export class OperatorVehicleController extends SimpleNodeJsController {
  protected __checkContext(): void {
    if (this._custom_data.user_type !== "operator") {
      return helpers.outputError(this.res, null, "Not allowed to perform this action")
    }
  }



  async deviceLists(id: string | undefined) {
    if (id && helpers.isInvalidID(id)) return helpers.outputError(this.res, 404)
    return this.__run({
      post: OperatorAssetService.RegisterDevice,
      put: OperatorAssetService.RegisterDevice,
      get: OperatorAssetService.GetDevices,
      patch: OperatorAssetService.UpdateDeviceStatus,
      delete: OperatorAssetService.DeleteDevice,
      id: { get: "optional", delete: "required", put: "required", patch: "required" },
    })
  }


  async vehicleLists(id: string | undefined) {
    if (id && helpers.isInvalidID(id)) return helpers.outputError(this.res, 404)
    let component = this.req.query.component as string
    return this.__run({
      post: OperatorAssetService.AddVehicles,
      put: OperatorAssetService.AddVehicles,
      get: OperatorAssetService.GetVehicles,
      patch: component === "status" ? OperatorAssetService.SuspendedVehicles : component === "assign" ?
        OperatorAssetService.AssignVehicleDevice : component === "unassign" ? OperatorAssetService.UnAssignVehicleDevice :
          () => helpers.outputError(this.res, null, component ? "Invalid component query" : "Component is required"),
      delete: OperatorAssetService.DeleteVehicle,
      id: { get: "optional", delete: "required", put: "required", patch: "required" },
    })
  }

  async collectionLists(id: string | undefined) {
    if (id && helpers.isInvalidID(id)) return helpers.outputError(this.res, 404)
    return this.__run({
      post: OperatorAssetService.CreateCollection,
      put: OperatorAssetService.CreateCollection,
      get: OperatorAssetService.GetCollections,
      patch: OperatorAssetService.UpdateCollection,
      delete: OperatorAssetService.DeleteCollection,
      id: { get: "optional", delete: "required", put: "required", patch: "required" },
    })
  }


}