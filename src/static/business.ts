import { formatMoney } from "src/utils/format"

type ShipmentCategory =
    | "GO-SEND"
    | "JNE"
    | "Personal Courier"

class Business {
    static Dropship = {
        fee: {
            number: 5900,
            string: formatMoney(5900)
        }
    }

    public Shipment = {
        GoSend: {
            name: "GO-SEND",
            price: 15000,
        },
        JNE: {
            name: "JNE",
            price: 9000,
        },
        PersonalCourier: {
            name: "Personal Courier",
            price: 29000,
        }
    }

    shipmentPrice(category: ShipmentCategory) {
        switch (category) {
            case 'GO-SEND':
                return this.Shipment.GoSend.price

            case 'JNE':
                return this.Shipment.JNE.price

            case 'Personal Courier':
                return this.Shipment.PersonalCourier.price
        }
    }
}

export default Business