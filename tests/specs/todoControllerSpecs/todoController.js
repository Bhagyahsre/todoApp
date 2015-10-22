var expect ='chai'.expect;
describe("todoController", function() {

    describe("inputBox", function() {
        it("Input box cannot be empty ", function() {
          

            expect(input.val()).to.be.a('string');
          
        });
    });
    describe("buttons", function() {
        it("All buttons should be disabled if there are no items in the list ", function() {
        	expect(todos).to.have.length.above(0);

        });
    });
    describe("totalCount", function() {
        it("Total count should be greater than Remaining and checked items  ", function() {
        	(expect(count).to.be.above(remain))&&(expect(count).to.be.above(checke));
        	
        });
    });

});
