CREATE TABLE `users`(
    `userID` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'felhasználó azonosító',
    `username` VARCHAR(255) NOT NULL COMMENT 'felhasznaló név',
    `email` VARCHAR(255) NOT NULL,
    `psw` VARCHAR(255) NOT NULL COMMENT 'jelszó',
    `role` VARCHAR(255) NOT NULL COMMENT 'admin e'
);
ALTER TABLE
    `users` ADD UNIQUE `users_username_unique`(`username`);
ALTER TABLE
    `users` ADD UNIQUE `users_email_unique`(`email`);
CREATE TABLE `ticketOrders`(
    `orderID` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'jegy rendelés azonosító',
    `userID` INT UNSIGNED NOT NULL COMMENT 'felhasznalo azonosito',
    `airlineId` INT UNSIGNED NOT NULL COMMENT 'legitarsasag azonosito',
    `status` ENUM('completed', 'cancelled', 'pending') NOT NULL
);
ALTER TABLE
    `ticketOrders` ADD INDEX `ticketorders_userid_index`(`userID`);
ALTER TABLE
    `ticketOrders` ADD INDEX `ticketorders_airlineid_index`(`airlineId`);
CREATE TABLE `airlines`(
    `airlineID` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'legitarsasag azonosito',
    `airline` VARCHAR(255) NOT NULL COMMENT 'legitarsasag neve'
);
CREATE TABLE `airlineImage`(
    `airlineID` INT UNSIGNED NOT NULL COMMENT 'legitarsasag azonosito',
    `airlineImg` VARCHAR(255) NOT NULL COMMENT 'legitarsasag logoja'
);
ALTER TABLE
    `airlineImage` ADD INDEX `airlineimage_airlineid_index`(`airlineID`);
CREATE TABLE `hotelOrders`(
    `orderID` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'hotel foglalas azonosító',
    `userID` INT UNSIGNED NOT NULL COMMENT 'felhasznalo azonosito',
    `date` TIMESTAMP NOT NULL COMMENT 'idopont',
    `day` INT NOT NULL COMMENT 'hany napra',
    `status` ENUM('completed', 'cancelled', 'pending') NOT NULL
);
ALTER TABLE
    `hotelOrders` ADD INDEX `hotelorders_userid_index`(`userID`);
CREATE TABLE `hotels`(
    `hotelID` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'hotel azonosito',
    `roomID` INT UNSIGNED NOT NULL COMMENT 'szoba azonosito',
    `name` VARCHAR(255) NOT NULL,
    `details` TEXT NOT NULL COMMENT 'leírás',
    `address` VARCHAR(255) NOT NULL COMMENT 'cím'
);
ALTER TABLE
    `hotels` ADD INDEX `hotels_roomid_index`(`roomID`);
CREATE TABLE `roomTypes`(
    `typeId` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'szoba tipus azonosito',
    `type` VARCHAR(255) NOT NULL COMMENT 'tipus pl double,twin'
);
CREATE TABLE `hotelImage`(
    `hotelID` INT UNSIGNED NOT NULL COMMENT 'hotel azonosito',
    `hotelImg` VARCHAR(255) NOT NULL COMMENT 'hotel fotok'
);
ALTER TABLE
    `hotelImage` ADD INDEX `hotelimage_hotelid_index`(`hotelID`);
ALTER TABLE
    `hotelImage` ADD UNIQUE `hotelimage_hotelimg_unique`(`hotelImg`);
CREATE TABLE `rooms`(
    `roomId` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'szoba azonosito',
    `hotelID` INT UNSIGNED NOT NULL COMMENT 'hotel azonosito',
    `typeId` INT UNSIGNED NOT NULL COMMENT 'szoba típus',
    `available` BOOLEAN NOT NULL COMMENT 'rendelkezesre all e a szoba',
    `price` DOUBLE NOT NULL,
    `guests` INT NOT NULL COMMENT 'vendegek szama',
    `climate` BOOLEAN NOT NULL COMMENT 'van e legkondi'
);
ALTER TABLE
    `rooms` ADD INDEX `rooms_hotelid_index`(`hotelID`);
ALTER TABLE
    `rooms` ADD INDEX `rooms_typeid_index`(`typeId`);
CREATE TABLE `services`(
    `serviceId` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'szerviz azonosito',
    `name` VARCHAR(255) NOT NULL COMMENT 'ellatas neve'
);
CREATE TABLE `serviceOfRoom`(
    `roomId` INT UNSIGNED NOT NULL COMMENT 'szoba azonosito',
    `serviceId` INT UNSIGNED NOT NULL COMMENT 'szoba szerviz azonosito'
);
ALTER TABLE
    `serviceOfRoom` ADD INDEX `serviceofroom_roomid_index`(`roomId`);
ALTER TABLE
    `serviceOfRoom` ADD INDEX `serviceofroom_serviceid_index`(`serviceId`);
CREATE TABLE `roomImage`(
    `roomId` INT UNSIGNED NOT NULL COMMENT 'szoba foto azonosito',
    `roomImg` VARCHAR(255) NOT NULL COMMENT 'szoba foto'
);
ALTER TABLE
    `roomImage` ADD INDEX `roomimage_roomid_index`(`roomId`);
ALTER TABLE
    `roomImage` ADD UNIQUE `roomimage_roomimg_unique`(`roomImg`);
CREATE TABLE `flights`(
    `flightsId` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'repulo azonosito',
    `airlineId` INT UNSIGNED NOT NULL COMMENT 'legitarsasag azonosito',
    `starting` TIMESTAMP NOT NULL COMMENT 'indulas',
    `arivval` TIMESTAMP NOT NULL COMMENT 'erkezes',
    `price` BIGINT NOT NULL COMMENT 'ar'
);
ALTER TABLE
    `flights` ADD INDEX `flights_airlineid_index`(`airlineId`);
ALTER TABLE
    `serviceOfRoom` ADD CONSTRAINT `serviceofroom_serviceid_foreign` FOREIGN KEY(`serviceId`) REFERENCES `services`(`serviceId`);
ALTER TABLE
    `hotelImage` ADD CONSTRAINT `hotelimage_hotelid_foreign` FOREIGN KEY(`hotelID`) REFERENCES `hotels`(`hotelID`);
ALTER TABLE
    `roomImage` ADD CONSTRAINT `roomimage_roomid_foreign` FOREIGN KEY(`roomId`) REFERENCES `rooms`(`roomId`);
ALTER TABLE
    `rooms` ADD CONSTRAINT `rooms_typeid_foreign` FOREIGN KEY(`typeId`) REFERENCES `roomTypes`(`typeId`);
ALTER TABLE
    `flights` ADD CONSTRAINT `flights_airlineid_foreign` FOREIGN KEY(`airlineId`) REFERENCES `airlines`(`airlineID`);
ALTER TABLE
    `airlineImage` ADD CONSTRAINT `airlineimage_airlineid_foreign` FOREIGN KEY(`airlineID`) REFERENCES `airlines`(`airlineID`);
ALTER TABLE
    `hotelOrders` ADD CONSTRAINT `hotelorders_userid_foreign` FOREIGN KEY(`userID`) REFERENCES `users`(`userID`);
ALTER TABLE
    `ticketOrders` ADD CONSTRAINT `ticketorders_airlineid_foreign` FOREIGN KEY(`airlineId`) REFERENCES `airlines`(`airlineID`);
ALTER TABLE
    `hotels` ADD CONSTRAINT `hotels_hotelid_foreign` FOREIGN KEY(`hotelID`) REFERENCES `hotelOrders`(`orderID`);
ALTER TABLE
    `serviceOfRoom` ADD CONSTRAINT `serviceofroom_roomid_foreign` FOREIGN KEY(`roomId`) REFERENCES `rooms`(`roomId`);
ALTER TABLE
    `ticketOrders` ADD CONSTRAINT `ticketorders_userid_foreign` FOREIGN KEY(`userID`) REFERENCES `users`(`userID`);
ALTER TABLE
    `rooms` ADD CONSTRAINT `rooms_hotelid_foreign` FOREIGN KEY(`hotelID`) REFERENCES `hotels`(`hotelID`);