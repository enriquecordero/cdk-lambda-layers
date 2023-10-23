import { double } from "../src/layers/calc/nodejs/calc/cal";

export async function handler() {
  return {
    body: JSON.stringify({num: double(15)}),
    statusCode: 200
  }
}