import {AlgebraVisitor} from "./AlgebraVisitor";
import {AbstractParseTreeVisitor} from "antlr4ts/tree";
import {
    MultOrDivideExpressionContext,
    NegativeNumberExpressionContext,
    NumberExpressionContext,
    PlusOrMinusExpressionContext, PowerExpressionContext
} from "./AlgebraParser";

export class ExpressionEvalVisitor extends AbstractParseTreeVisitor<number> implements AlgebraVisitor<number>{
    protected defaultResult(): number {
        return 0;
    }

    protected aggregateResult(aggregate: number, nextResult: number): number{
        return aggregate + nextResult;
    }

    visitMultOrDivideExpression(ctx: MultOrDivideExpressionContext): number {
        switch (ctx._op.text){
            case "*": return this.visit(ctx._left) * this.visit(ctx._right);
            case "/": return this.visit(ctx._left) / this.visit(ctx._right);
            default:
                throw new Error(`Not supported operator ${ctx._op.text}`)
        }
    }

    visitNegativeNumberExpression(ctx: NegativeNumberExpressionContext): number {
        return -1 * this.visit(ctx._num);
    }

    visitNumberExpression(ctx: NumberExpressionContext): number {
        return parseInt(ctx.text);
    }

    visitPlusOrMinusExpression(ctx: PlusOrMinusExpressionContext): number {
        switch (ctx._op.text){
            case "+": return this.visit(ctx._left) + this.visit(ctx._right);
            case "-": return this.visit(ctx._left) - this.visit(ctx._right);
            default:
                throw new Error(`Not supported operator ${ctx._op.text}`)
        }
    }

    visitPowerExpression(ctx: PowerExpressionContext): number {
        return Math.pow(this.visit(ctx._num), this.visit(ctx._pow));
    }

}
