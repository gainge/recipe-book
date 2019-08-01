<?php
class Database {

	// Define some cool variables my guy
	private $db_name = "api_db";
	public $conn;

	// Get the database connection
	public function getConnection() {
		$this->conn = null;

		try {
			$this->conn = new PDO("sqlite:../../" . $this->db_name . ".db");
		} catch (PDOException $exception) {
			echo "Connection error: " . $exception->getMessage();
		}

		// Give the database back, or whatever
		return $this->conn;
	}

	
}
?>