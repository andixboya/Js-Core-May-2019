//-1 test!
let solution= (function solve() {
    return {
        call: function (object, arguments) {
            switch (arguments) {
                case 'upvote':
                    object.upvotes += 1;
                    break;
                case'downvote':
                    object.downvotes += 1;
                    break;
                case`score`:
                    return report(object);
            }


        },
    }

    function report(object) {

        const upvotes = object.upvotes;
        const downvotes = object.downvotes;
        const totalVotes = upvotes + downvotes;

        let reportUpvotes = upvotes;
        let reportDownvotes = downvotes;

        if (totalVotes > 50) {
            const greaterNumber=Math.max(reportUpvotes,reportDownvotes);
            reportUpvotes = Math.ceil(reportUpvotes + 0.25 * greaterNumber);
            reportDownvotes=Math.ceil(reportDownvotes+0.25*greaterNumber);
        }

        const diff=upvotes-downvotes;
        let rating;

        const partOfUpvotes= upvotes/totalVotes;
        const partOfDownvotes=downvotes/totalVotes;



        if (partOfUpvotes>0.66 && reportUpvotes>100){
            rating=`hot`;
        }  else if (partOfUpvotes<0.66 && partOfDownvotes<0.66 && diff>=0 &&(upvotes>100 || downvotes>100)){
            rating=`controversial`;
        } else if (diff<0){
            rating=`unpopular`;
        } else if (totalVotes<10){
            rating=`new`;
        }

        return [reportUpvotes,reportDownvotes,diff,rating];
    }
})();

const post = {
    id: '1234',
    author: 'author name',
    content: 'these fields are irrelevant',
    upvotes: 4,
    downvotes: 5
};


solution.call(post, 'upvote');
solution.call(post, 'downvote');

let score = solution.call(post, 'score'); // [127, 127, 0, 'controversial']
console.log(score);
for (let i = 0; i < 50; i++) {
    solution.call(post, 'downvote');
}

solution.call(post, 'downvote');         // (executed 50 times)
score = solution.call(post, 'score');

