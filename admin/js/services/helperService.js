(function() {
    app.service('helperService', Service);

    function Service() {
        this.getPaginationObj = (data) => {
                var paginationObj = {};
                // if length not equal to 0
                if (data.docs.length) {
                    // store all result list
                    paginationObj['list'] = data.docs;
                    //GEt current page Number
                    paginationObj['currentPage'] = parseInt(data.page);
                    //if page is 1 then set disabled prev
                    if (data.page == 1) {
                        paginationObj['prev'] = true;
                        paginationObj['from'] = 1;
                    } else {
                        //Enable pre list icon
                        paginationObj['prev'] = false;
                        paginationObj['from'] = (parseInt(data.page) - 1) * data.limit + 1;
                    }
                    //if total page is equl to current page then disabled next icon
                    paginationObj['next'] = data.page == data.pages ? true : false;
                    paginationObj['to'] = data.page == data.pages ? data.total : parseInt(data.page) * data.limit;
                    paginationObj['total'] = data.total;
                } else {
                    //if length equal to 0
                    paginationObj['list'] = [];
                    paginationObj['prev'] = true;
                    paginationObj['next'] = true;
                }
                return paginationObj;
            }, this.getPageNumber = (flag, currentPage) => {
                var page;
                if (flag == 'prev') {
                    // decrease the current page number
                    page = currentPage - 1;
                }
                if (flag == 'next') {
                    // Increase the current page number
                    page = currentPage + 1;
                }
                return page;
            },


            this.appendFileInFormData = (files) => {
                // create form date object
                var formdata = new FormData();
                var imgUrlList = [];
                // iterate all image  
                angular.forEach(files, function(value, key) {
                    //append in fromdata object
                    formdata.append(key, value);
                    // get uploaded image local url
                    imgUrlList.push(URL.createObjectURL(value));
                });

                return [formdata, imgUrlList];
            },
            this.restaurantData = {};
    }
})();