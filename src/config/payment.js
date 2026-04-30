import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: `${process.env.ACCESS_TOKEN_MERCADO_PAGO}`,
});

const preference = new Preference(client);

export const createPreference = async (req, res) => {
  preference
    .create({
      body: {
        items: [
          {
            title: req.body.title,
            quantity: req.body.quantity,
            unit_price: req.body.unit_price,
          },
        ],

        back_urls: {
          success: "https://primeira-marcha-backend.vercel.app/success",
          failure: "https://primeira-marcha-backend.vercel.app/failure",
          pending: "https://primeira-marcha-backend.vercel.app/pending",
        },
        auto_return: "all",
      },
    })
    .then((response) => {
      res
        .status(200)
        .json({
          message: "Preferência de pagamento criada com sucesso",
          response: response.init_point,
        });
    })
    .catch((error) => {
      res.status(500).json({ msg: "Erro ao criar preferência de pagamento" });
    });
};
