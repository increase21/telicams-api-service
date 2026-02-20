import { Schema } from "mongoose";
import { DatabaseTableList } from "../assets/var-config";
import { dbConn, InferSchemaType, mongoose, tableID } from "./dbConnector";

const DashcamList = new mongoose.Schema({
  operator_id: {
    type: Schema.Types.ObjectId,
    index: true,
    ref: DatabaseTableList.user_operators,
    required: true,
  },
  device_number: {
    type: String,
    index: true,
    maxlength: 20,
    unique: true,
    required: true,
  },
  device_model: {
    type: String,
    maxlength: 50,
    required: true,
  },
  device_oem: {
    type: String,
    maxlength: 50,
    required: true,
  },
  online: {
    type: Boolean,
    default: false,
    index: true,
  },
  active_status: {
    type: Number,
    enum: [0, 1, 2, 3], //0 - inactive, 1 - active, 2 - suspended, 3 - decommissioned
    default: 1,
  },
  assign_status: {
    type: Number,
    enum: [0, 1], //0 - not assigned, 1 - assigned
    default: 0,
  },
  created_by: {
    type: String,
    enum: ["operator", "admin"],
    required: true,
  },
  suspension_reason: {
    type: String,
    maxlength: 500,
    default: "",
  },
}, {
  id: true,
  timestamps: true,
  minimize: true
})

const CollectionList = new mongoose.Schema({
  operator_id: {
    type: Schema.Types.ObjectId,
    index: true,
    ref: DatabaseTableList.user_operators,
    required: true,
  },
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  description: {
    type: String,
    maxlength: 500,
    default: "",
  },
  status: {
    type: Number,
    enum: [1, 2], //1 - active, 2 - archived
    default: 1,
  }
}, {
  id: true,
  timestamps: true,
  minimize: true
})

CollectionList.index({ operator_id: 1, name: 1 }, { unique: true })

const DashcamDeviceModel = dbConn.model(DatabaseTableList.dashcam_devices, DashcamList)
const CollectionListModel = dbConn.model(DatabaseTableList.collection_lists, CollectionList)
type DashcamDeviceTypes = InferSchemaType<typeof DashcamList> & tableID

export {
  DashcamDeviceModel, DashcamDeviceTypes, CollectionListModel
}

