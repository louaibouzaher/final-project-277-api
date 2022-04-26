// const Player = require("../models/PlayerModel");
const db = require("../../db.config");
exports.getAllPlayers = async (req, res) => {
  try {
    await db.query("select * from playersinteam ", (error, results, fields) => {
      if (error) {
        res.send(error);
      }
      res.send(results);
      return;
    });
  } catch (err) {
    res.send(err);
  }
};
exports.getFilteredPlayers = async (req, res) => {
  try {
    const filters = Object.keys(req.body)
      .map((key) => `${key} = "${req.body[key]}"`)
      .join(" AND ");
    console.log(filters);
    const q =
      `select * from playersinteam ` +
      (filters.length > 1 ? `where ${filters}` : "");
    console.log(q);
    await db.query(q, (error, results, fields) => {
      if (error) {
        res.send(error);
        return;
      }
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    res.send({ error: err, data: [] });
  }
};

exports.createPlayer = async (req, res) => {
  try {
    const player = req.body;
    const q = `CALL addPlayer("${player.firstName}",
    "${player.lastName}", 
     "${player.picture}",
      '${player.birthdate}',"${player.nationality}",
        "${player.currentClub}", 
        "${player.nationalTeam}",
         ${player.shirtNumber},
         "${player.position}", 
          ${player.numberOfGoals},
           ${player.numberOfTrophies});`;

    await db.query(q, (error, results, fields) => {
      if (error) {
        res.send(error).sendStatus(400);
        return;
      }
      console.log(results);
      res.send(results);
    });
    // console.log(`insert people(firstName,lastName,picture,birthdate,nationality) values("${
    //   player.firstName
    // }","${player.lastName}","${player.picture}","${player.birthdate}",${
    //   player.nationalTeam
    // });
    // select @p_Id :=ID from people where firstName=${
    //   player.firstName
    // } and lastName=${player.lastName};
    // INSERT into contractor values (${new Date().getTime()},@p_Id);
    // select @c_Id :=contractor_Id from contractor where people_Id=@p_Id;
    // select @cl_Id :=clubId from club join team on team.ID=club.clubId where team.teamName=${
    //   player.club
    // };
    // select @n_Id :=nationalteam.nationalId from nationalteam join team on team.ID=nationalteam.teamId where team.teamName=${
    //   player.team
    // };
    //  insert into player values(${new Date().getTime()},@c_Id,${
    //   player.shirtNumber
    // },"${player.club}",${player.position},@n_Id,@cl_Id);
    // select @pl_Id :=playerId from player where contractorId=@c_Id;
    // insert into playerstatistics values(@pl_Id,${player.numberOfGoals},${
    //   player.numberOfTrophies
    // },100);
    // `);
    // await db.query(
    //   `insert people(firstName,lastName,picture,birthdate,nationality) values("${
    //     player.firstName
    //   }","${player.lastName}","${player.picture}","${player.birthdate}",${
    //     player.nationality
    //   });
    //   select @p_Id :=ID from people where firstName=${
    //     player.firstName
    //   } and lastName=${player.lastName};
    //   INSERT into contractor values (${new Date().getTime()},@p_Id);
    //   select @c_Id :=contractor_Id from contractor where people_Id=@p_Id;
    //   select @cl_Id :=clubId from club join team on team.ID=club.clubId where team.teamName=${
    //     player.club
    //   };
    //   select @n_Id :=nationalteam.nationalId from nationalteam join team on team.ID=nationalteam.teamId where team.teamName=${
    //     player.team
    //   };
    //    insert into player values(${new Date().getTime()},@c_Id,${
    //     player.shirtNumber
    //   },"${player.club}",${player.position},@n_Id,@cl_Id);
    //   select @pl_Id :=playerId from player where contractorId=@c_Id;
    //   insert into playerstatistics values(@pl_Id,${player.numberOfGoals},${
    //     player.numberOfTrophies
    //   },100);
    //   `,
    //   (error, results, fields) => {
    //     if (error) {
    //       res.send(error);
    //     }
    //     console.log(results);
    //     res.send(results);
    //   }
    // );
    // await db.query("insert into player", (error, results, fields) => {
    //   if (error) {
    //     res.send(error);
    //   }
    //   console.log(results);
    //   res.send(results);
    // });
    return;
  } catch (err) {
    res.send(err);
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    const targetPlayer = await Player.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      color: req.body.color,
      price: req.body.price,
      image: req.body.image,
    });
    res.json({
      message: "Player Updated Successfully",
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    await db.query(
      `delete from player where id=${req.params.id}`,
      (error, results, fields) => {
        if (error) {
          res.send(error);
        }
        console.log(results);
        res.send(results);
      }
    );
  } catch (err) {
    res.send(err);
  }
};
