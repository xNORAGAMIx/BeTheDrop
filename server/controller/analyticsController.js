import Donation from "../models/donationModel.js";
import BloodTransfer from "../models/bloodTransferModel.js";
import Alert from "../models/alertModel.js";

export const getHospitalAnalytics = async (req, res) => {
  try {
    const hospitalId = req.body.userId; // Assuming hospital is logged in
    const currentYear = new Date().getFullYear();
    const months = Array.from({ length: 12 }, (_, i) => i);

    // Fetch all donations, transfers and alerts for this hospital
    const donations = await Donation.find({
      hospital: hospitalId,
      createdAt: {
        $gte: new Date(`${currentYear}-01-01`),
        $lte: new Date(`${currentYear}-12-31`),
      },
    });

    const transfers = await BloodTransfer.find({
      $or: [{ fromHospital: hospitalId }, { toHospital: hospitalId }],
      createdAt: {
        $gte: new Date(`${currentYear}-01-01`),
        $lte: new Date(`${currentYear}-12-31`),
      },
    });

    const alerts = await Alert.find({
      hospitalId,
      createdAt: {
        $gte: new Date(`${currentYear}-01-01`),
        $lte: new Date(`${currentYear}-12-31`),
      },
    });

    const monthlyStats = months.map((month) => {
      const donationsThisMonth = donations.filter(
        (d) => new Date(d.createdAt).getMonth() === month
      );
      const transfersOut = transfers.filter(
        (t) =>
          t.fromHospital?.toString() === hospitalId.toString() &&
          new Date(t.createdAt).getMonth() === month
      );
      const alertsThisMonth = alerts.filter(
        (a) => new Date(a.createdAt).getMonth() === month
      );

      return {
        month: new Date(2024, month).toLocaleString("default", {
          month: "short",
        }),
        receivedML: donationsThisMonth.reduce(
          (sum, d) => sum + d.quantityInML,
          0
        ),
        sentML: transfersOut.reduce((sum, t) => sum + t.quantityInML, 0),
        totalDonations: donationsThisMonth.length,
        totalAlerts: alertsThisMonth.length,
      };
    });

    res.status(200).json({
      status: true,
      message: " Hospital analytics retrieved successfully,",
      analytics: monthlyStats,
    });
  } catch (err) {
    console.error("Hospital analytics error:", err);
    res
      .status(500)
      .json({ status: false, message: "Failed to fetch hospital analytics" });
  }
};
