import { Any } from "src/types/share"
import { formatMoney } from "src/utils/format"

class Business {
    static Dropship = {
        fee: {
            number: 5900,
            string: formatMoney(5900)
        }
    }

    static Shipment = {
        GoSend: {
            name: "GO-SEND",
            price: 15000,
            estimate: 'today',
        },
        JNE: {
            name: "JNE",
            price: 9000,
            estimate: '2 days',
        },
        PersonalCourier: {
            name: "Personal Courier",
            price: 29000,
            estimate: '1 day',
        }
    }

    static Payment = ['e-Wallet', 'Bank Transfer', 'Virtual Account']
}

type ShipmentCategory =
    | "GO-SEND"
    | "JNE"
    | "Personal Courier"

export const getShipmentData = (category: ShipmentCategory) => {
    const { Shipment } = Business

    switch (category) {
        case 'GO-SEND':
            return Shipment.GoSend

        case 'JNE':
            return Shipment.JNE

        case 'Personal Courier':
            return Shipment.PersonalCourier
    }
}

export default Business