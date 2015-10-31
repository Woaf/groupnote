//Viewmodel 

var statusTexts = {
    'newPublic': 'Új - Publikus',
    'oldPublic': 'Korábbi - Publikus',
    'newPrivate': 'Új - Privát',
    'oldPrivate': 'Korábbi - Privát',
    'DELETED' : 'DELETED',
};

var statusClasses = {
    'newPublic': 'success',
    'oldPublic': 'success', 
    'newPrivate': 'warning',
    'oldPrivate': 'warning',
    'DELETED' :'warning',
};

function decoratePosts(postContainer) {
    return postContainer.map(function (e) {
        e.statusText = statusTexts[e.status];
        e.statusClass = statusClasses[e.status];
        return e;
    });
}

module.exports = decoratePosts;