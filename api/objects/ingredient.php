<?php
class Ingredient extends DBObject {
    private $table_name = "Ingredient";

    // Object properties
    public $name;
    public $unit;
    public $reference;

    
    // Database constructor is inherited from DBObject

    // Create function - used to insert new ingredient records into the database
    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
				(id, name, unit, reference)
			VALUES (
                :id, :name, :unit, :reference)";
                
        
        // Prepare query
        $stmt = $this->conn->prepare($query);

        // Sanitize
		$this->id = htmlspecialchars(strip_tags($this->id));
		$this->name = htmlspecialchars(strip_tags($this->name));
		$this->unit = htmlspecialchars(strip_tags($this->unit));
		$this->reference = htmlspecialchars(strip_tags($this->reference));

		// Bind the values
		$stmt->bindParam(":id", $this->id);
		$stmt->bindParam(":name", $this->name);
		$stmt->bindParam(":unit", $this->unit);
		$stmt->bindParam(":reference", $this->reference);

		// Do the thing!
		return $stmt->execute();
    }

    public function read() {	// Reads all them suckers
		// Select all query
		$query = "SELECT * FROM " . $this->table_name . " ORDER BY name DESC";

		// Prepare query statement
		$stmt = $this->conn->prepare($query);

		// Execute the statement
		$stmt->execute();

		return $stmt;
    }

    //select * from Ingredient join RecipeUses on Ingredient.id = RecipeUses.ingredientID where recipeID = 2
    
    public function readByRecipe($recipeID) {
        $query = "SELECT * FROM " . $this->table_name . " 
            JOIN 
                RecipeUses 
            ON 
                " . $this->table_name . ".id = RecipeUses.ingredientID 
            WHERE 
                recipeID = ? ORDER BY index ASC";

		// Prepare the statement
		$stmt = $this->conn->prepare($query);

		// Bind the target project id
		$stmt->bindParam(1, $recipeID);

		// Execute query
		$stmt->execute();

		// Give back dem results
		return $stmt;
    }




    public function update() {
        $query = "UPDATE " . $this->table_name . "
				SET
					id = :id,
					name = :name,
					unit = :unit,
					reference = :reference
				WHERE
					id = :id";

        // Prepare statement!
        $stmt = $this->conn->prepare($query);
         
        // Sanitize
		$this->id = htmlspecialchars(strip_tags($this->id));
		$this->name = htmlspecialchars(strip_tags($this->name));
		$this->unit = htmlspecialchars(strip_tags($this->unit));
		$this->reference = htmlspecialchars(strip_tags($this->reference));

		// Bind the values
		$stmt->bindParam(":id", $this->id);
		$stmt->bindParam(":name", $this->name);
		$stmt->bindParam(":unit", $this->unit);
		$stmt->bindParam(":reference", $this->reference);

		// Do the thing!
		return $stmt->execute();
    }


    












    protected function getTableName() {
        return $this->table_name;
    }











}

?>

