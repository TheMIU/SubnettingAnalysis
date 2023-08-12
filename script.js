$(document).ready(function () {
    $("#calculate").click(function () {
        let ipAddress = $("#ipAddress").val().trim();
        let subnetMask = $("#subnetMask").val().trim();

        // Classify IP address and update analysis results
        classifyIPAddress(ipAddress);

        // Update the subnet mask in binary format
        $(".subnetMaskBinary").text(toBinary(subnetMask));
        $("#ipInBinary").text(toBinary(ipAddress));

        // Get the network bits from the span
        let networkBits = parseInt($("#NetworkBits").text());

        // Calculate and update additional analysis information
        calculateAdditionalInfo(subnetMask, networkBits);
    });

    function classifyIPAddress(ipAddress) {
        let firstOctet = parseInt(ipAddress.split(".")[0]);

        let addressRange = "";
        let ipClass = "";
        let NetworkBits = "";

        if (firstOctet >= 1 && firstOctet <= 126) {
            addressRange = "1-126";
            ipClass = "A";
            NetworkBits = "8";
        } else if (firstOctet >= 128 && firstOctet <= 191) {
            addressRange = "128-191";
            ipClass = "B";
            NetworkBits = "16";
        } else if (firstOctet >= 192 && firstOctet <= 223) {
            addressRange = "192-223";
            ipClass = "C";
            NetworkBits = "24";
        } else {
            addressRange = "Not in the defined ranges";
            ipClass = "N/A";
            NetworkBits = "N/A";
        }

        $("#addressRange").text(addressRange);
        $("#ipClass").text(ipClass);
        $("#NetworkBits").text(NetworkBits);
    }

    function toBinary(subnetMask) {
        // Convert each octet of the subnet mask to binary and join them
        let binaryMask = subnetMask.split(".")
            .map(octet => (parseInt(octet).toString(2)).padStart(8, '0'))
            .join(".");

        return binaryMask;
    }

    function calculateAdditionalInfo(subnetMask, networkBits) {
        let prefixBits = subnetMask.split(".").map(octet => parseInt(octet).toString(2).padStart(8, '0')).join("").indexOf("0");
        let subnetBits = prefixBits - networkBits;
        let hostBits = 32 - prefixBits;
        let possibleSubnetsNo = Math.pow(2, subnetBits);
        let possibleHostsNo = Math.pow(2, hostBits) - 2;

        $("#prefixBits").text(prefixBits);
        $("#subnetBits").text(subnetBits);
        $("#hostBits").text(hostBits);
        $("#possibleSubnetsNo").text(possibleSubnetsNo);
        $("#possibleHostsNo").text(possibleHostsNo);
    }
});