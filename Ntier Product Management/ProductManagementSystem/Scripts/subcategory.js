var isdeleted;
var isedited;

function OnSuccess(data) {
    if (isdeleted) {
        $('#deleteSubCategoryModal').modal('toggle');
    }
    if (isedited) {
        $('#editSubCategoryModal').modal('toggle');
    }
    var categoryName = $('#txtProductSubCategoryName').val();
    if (categoryName != "") {
        $('#txtProductSubCategoryName').val('');
        $("#addsubCategory1").toggle("slow");
    }

    isdeleted = false;
    isedited = false;
}

$(document).delegate("#addsubCategory", "click", function () {
    $("#addsubCategory1").toggle("slow");
});

$(document).on('click', '#edit-Subcategory', function () {
    isedited = true;
    var url = "/ProductSubCategory/Edit"; // the url to the controller
    var id = $(this).attr('data-id'); // the id that's given to each button in the list
    $.get(url + '/' + id, function (data) {
        $('#edit-Subcategory-container').html(data);
        $.validator.unobtrusive.parse($("#editsubCategoryForm"));
        $('#editSubCategoryModal').modal('show');
    });
});

$(document).on('click', '#details-Subcategory', function () {
    var url = "/ProductSubCategory/Details"; // the url to the controller
    var id = $(this).attr('data-id'); // the id that's given to each button in the list
    $.get(url + '/' + id, function (data) {
        $('#details-Subcategory-container').html(data);
        $('#detailsSubCategoryModal').modal('show');
    });
});

$(document).on('click', '#delete-Subcategory', function () {
    isdeleted = true;
    var url = "/ProductSubCategory/Delete"; // the url to the controller
    var id = $(this).attr('data-id'); // the id that's given to each button in the list
    $.get(url + '/' + id, function (data) {
        $('#delete-Subcategory-container').html(data);
        $('#deleteSubCategoryModal').modal('show');
    });
});

$(document).on('click', '#search-subcategory', function () {
    var url = "/ProductSubCategory/Search"; // the url to the controller
    var id = $('#txtSubCategory').val(); // the id that's given to each button in the list
    $.get(url + '/' + id, function (data) {
        $('#tableBody').html(data);
    });
});

$(document).on('click', '#btnrefreshSubCategory', function () {
    isdeleted = true;
    var url = "/ProductSubCategory/List"; // the url to the controller
    var id = $(this).attr('data-id'); // the id that's given to each button in the list
    $.get(url + '/' + id, function (data) {
        $('#tableBody').html(data);
    });
});
