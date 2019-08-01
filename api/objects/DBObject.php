<?php


abstract class DBObject {

    // Database connection and table name
    protected $conn;
    protected $table_name;

    // Object properties
    protected $id;


    // Constructor with $db Database connection
	public function __construct($db) {
		$this->conn = $db;
    }
    

    public function delete() {
        // delete query
    	$query = "DELETE FROM " . $this->getTableName() . " WHERE id = ?";

		// Prepare the statement
		$stmt = $this->conn->prepare($query);

		// Sanitize
    	$this->id=htmlspecialchars(strip_tags($this->id));

		// Bind the data
		$stmt->bindParam(1, $this->id);

		// Do it dude
		return $stmt->execute();
    }

    abstract protected function getTableName();


}



?>

