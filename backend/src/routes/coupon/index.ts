import {Request, Response, Router} from "express";
import { STATUS_CODES } from "http";
import { getRepository } from "typeorm";
import { Coupon } from "../../entity/Coupon";

const router = Router();

router.get("/check", async (req: Request, res: Response) => {
  const coupons = await getRepository(Coupon).find();

  const couponCode = req.query.code;

  console.log(couponCode);

  const validCoupons = coupons.filter((v) => v.code == couponCode && v.active);

  console.log(validCoupons);

  if(validCoupons.length > 0) {
    res.status(200).send();
  } else {
    res.status(403).send();
  }
});

router.post("/", async (req: Request, res: Response) => {
  let coupon = req.body;
  const couponRepository = getRepository(Coupon);
  try {
    coupon = couponRepository.create(coupon);
    coupon = await couponRepository.save(coupon);

    res.status(200).json(coupon);
  } catch(e) {
    res.status(400).json({error: e.message});
  }
});

router.put("/deactivate", async (req: Request, res: Response) => {
  const couponRepository = getRepository(Coupon);
  const couponId = req.query.id;

  try {
    let coupon = await couponRepository.findOne({where: {id: couponId}});
    coupon.active = false;
    coupon = couponRepository.merge(coupon);
    coupon = await couponRepository.save(coupon);
    res.status(200).json(coupon);
  } catch(e) {
    res.status(400).json({error: e.message});
  }
});

export default router;