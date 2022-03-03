import promptSync from "prompt-sync";
import {AlgebraLexer} from "./AlgebraLexer";
import { CharStreams, CommonTokenStream} from "antlr4ts";
import {AlgebraParser} from "./AlgebraParser";
import {ExpressionEvalVisitor} from "./ExpressionEvalVisitor";

let expr = '';
const prompt = promptSync({});
do{
    expr = prompt('Enter expression to evaluate:');
    if(expr !== '') {
        const lexer = new AlgebraLexer(CharStreams.fromString(expr));
        const parser = new AlgebraParser(new CommonTokenStream(lexer));

        const evaluator = new ExpressionEvalVisitor();
        console.log(`result: ${evaluator.visit(parser.root())}`);
    }
}while(expr !== '')
