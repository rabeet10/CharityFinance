jQuery('.numbersOnly').keyup(function () {
    this.value = this.value.replace(/[^0-9\.,]/g, '');
});





function tblcases() {


    $("#datatable").DataTable({
        "ajax": "api/TblCasesPanel.php",
        "columns": [
            { "data": "Empty" },
            { "data": "CaseID" },
            { "data": "DOC" },
            { "data": "casetype" },
            { "data": "caseDescription" },
            { "data": "foremarks" },
            { "data": "foamount" },
            { "data": "Name" },
            { "data": "Fathersname" },
            { "data": "cnic" },
            { "data": "contact" },
            { "data": "email" },
            { "data": "status" }

        ],
    });

}


$(document).ready(function () {


    tblcases();

    $(document).on("click", ".edit-modal", function () {


        $("#id1").val($(this).attr("id"));
        $("#date1").val($(this).data("date"));
        $("#casetype1").val($(this).data("casetype"));
        $("#casedesc1").val($(this).data("casedesc"));
        $("#name1").val($(this).data("name"));
        $("#fathername1").val($(this).data("fathername"));
        $("#cnic1").val($(this).data("cnic"));
        $("#contact1").val($(this).data("contact"));
        $("#email1").val($(this).data("email"));
        $("#status1").val($(this).data("status"));
        $("#foremarks").val($(this).data("foremarks"));
        $("#foamount").val($(this).data("foamount"));

    });



});


function Updateremarks(value) {

    var mailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    var caseid = $("#id1").val();
    var remarks = $("#remarks1").val();
    var poamount = $("#poamount").val();
    var status = value;


    $("#remarks1").css("border-color", "");
    $("#10v").css("display", "");
    $("#foamount").css("border-color", "");
    $("#11v").css("display", "");



    if (remarks == "") {
        $("#10v1").css("display", "block");
        $("#10v1").text("Please Enter Some Remarks.");
        $("#remarks1").css("border-color", "red");
        $("#remarks1").focus();
    }
    else if (foamount == "") {
        $("#11v1").css("display", "block");
        $("#11v1").text("Please Enter Some Remarks.");
        $("#foamount").css("border-color", "red");
        $("#foamount").focus();
    }
    else {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to " + status + " ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: "api/PanelStatus.php",
                    method: "POST",
                    data: {
                        caseid: caseid,
                        remarks: remarks,
                        poamount: poamount,
                        status: status
                    },
                    dataType: "JSON",
                    success: function (data) {
                        var result = data.result;
                        if (result == "Success") {
                            Swal.fire({
                                title: "Application is " + status + " Successfully!",
                                type: "success",
                                timer: 4000,
                                showConfirmButton: true,
                            })
                            $("#btncancel").trigger("click");
                            $("#datatable").DataTable().destroy();
                            tblcases();
                        }
                        else {
                            Swal.fire({
                                title: "Opps! Some Error Occured!",
                                type: "error",
                                text: "Please login first",
                                timer: 4000,
                                showConfirmButton: true,
                            }).then(function () {
                                window.location.href = "index.php";
                            });
                        }
                        return data;
                    }
                });
            }
        })
    }
}
