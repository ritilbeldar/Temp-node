const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const InstallmentSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    paymentMode: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const MemberBodySchema = new mongoose.Schema(
  {
    memberHeight: {
      type: String,
    },
    memberWeight: {
      type: String,
    },
    memberBicepsSizeNormal: {
      type: String,
    },
    memberBicepsSizePump: {
      type: String,
    },
    memberForearmsSize: {
      type: String,
    },
    memberWristSize: {
      type: String,
    },
    memberChestSizeNormal: {
      type: String,
    },
    memberChestSizePump: {
      type: String,
    },
    memberObliquesSize: {
      type: String,
    },
    memberWaistSize: {
      type: String,
    },
    memberHipSize: {
      type: String,
    },
    memberThighSize: {
      type: String,
    },
    physicalRemark: {
      type: String,
    },
  },
  { timestamps: true }
);

const MembershipSchema = new mongoose.Schema(
  {
    joinDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    packagePreference: {
      type: String,
    },
    packageDuration: {
      type: String,
    },
    packageTotalPrice: {
      type: Number,
    },
    firstInstallment: {
      type: Number,
    },
    extendDays: {
      type: String,
    },
    dueAmount: {
      type: Number,
    },
    installments: [InstallmentSchema],
  },
  { timestamps: true }
);

const AttendanceSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  sessions: [
    {
      sessionTime: {
        type: String,
        enum: ["M", "E"],
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
        required: true,
      },
    },
  ],
});
const NewMemberSchema = new mongoose.Schema(
  {
    memberName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    memberFatherName: {
      type: String,
    },
    memberGender: {
      type: String,
    },
    memberDOB: {
      type: String,
    },
    memberNumber: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10 ,
    },
    memberEmail: {
      type: String,
      trim: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
    },
    memberAddress: {
      type: String,
      trim: true,
    },
    memberAlternateNumber: {
      type: String,
    },
    memberanyDisease: {
      type: String,
    },
    memberanyInjuries: {
      type: String,
    },
    
    memberBody: [MemberBodySchema],
    memberships: [MembershipSchema],
    attendance: [AttendanceSchema],

    productOrder: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PointofSaleOrder",
      },
    ],

    personalTrainings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PtMember",
      },
    ],
    clientRemark: {
      type: String,
    },
    lastEmailSent: Date,
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

NewMemberSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const NewMember = mongoose.model("NewMember", NewMemberSchema);

module.exports = NewMember;
