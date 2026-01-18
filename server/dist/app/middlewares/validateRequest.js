"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // validation check
            // if everything all right -> next()
            // Try to parse with body wrapper first, if fails try direct body
            try {
                yield schema.parseAsync({
                    body: req.body
                });
            }
            catch (e) {
                // If schema doesn't have 'body' key, validate req.body directly
                yield schema.parseAsync(req.body);
            }
            next();
        }
        catch (err) {
            next(err);
        }
    });
};
exports.default = validateRequest;
