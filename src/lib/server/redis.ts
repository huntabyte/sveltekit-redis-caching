import { Redis } from "ioredis";
import { REDIS_PASSWORD } from "$env/static/private";

export const redis = new Redis(
	`redis://default:${REDIS_PASSWORD}@redis-13997.c14.us-east-1-3.ec2.cloud.redislabs.com:13997`,
);
