from flask import Flask, request, jsonify
import psycopg2
from flask_cors import CORS  # Importa la extensión Flask-CORS

app = Flask(__name__)
CORS(app)

conn = psycopg2.connect(
    dbname="terranova",
    user="postgres",
    password="39790251",
    host="localhost"
)

def getExpertise(score):
    if score < 5:
        return "Untrained"
    if score < 10:
        return "Trained"
    if score < 20:
        return "Expert"
    if score < 30:
        return "Master"
    return "Legendary"
    


@app.route('/new', methods=['POST'])
def post_new():
    if request.method == 'POST':
        athletics = request.json.get('athletics')
        finesse = request.json.get('finesse')
        practise = request.json.get('practise')
        cleverness = request.json.get('cleverness')
        charisma = request.json.get('charisma')
        erudition = request.json.get('erudition')

        try:
            cur = conn.cursor()
            cur.execute("INSERT INTO adventurers (Athletics_Natural, Finesse_Natural, Practise_Natural, Cleverness_Natural, Charisma_Natural, Erudition_Natural) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
                        (athletics, finesse, practise, cleverness, charisma, erudition))
            inserted_id = cur.fetchone()[0]
            conn.commit()
            return jsonify({"id": inserted_id}), 201
        except psycopg2.Error as e:
            print(e)
            conn.rollback()
            return "Insert error", 500
        finally :
            cur.close()

@app.route('/tribe', methods=['GET'])
def get_tribe():
    if request.method == 'GET':
        id = request.args.get('id')
        special_rules_string = request.args.get('specialRules')
        special_rules_list = [rule.strip() for rule in special_rules_string.split(';') if rule.strip()]
        special_rules_dict = {rule: '' for rule in special_rules_list}
        try:
            with conn.cursor() as cur:
                cur.execute("SELECT alignment FROM adventurers WHERE id = %s", (id,))
                result = cur.fetchone()
                alignment = result[0] if result else None

            sp_dict = {}
            with conn.cursor() as cur:
                for key in special_rules_dict.keys():
                    cur.execute("SELECT name, description FROM special_rules WHERE keyword = %s", (key,))
                    result = cur.fetchone()
                    name = result[0] if result else None
                    description = result[1] if result else None
                    sp_dict[key] = (name, description)

            response_dict = {
                'alignment': alignment,
                'specialRules': sp_dict
            }
            return jsonify(response_dict), 200
        except psycopg2.Error as e:
            print(e)
            return "Get error", 500
        finally :
            cur.close()

@app.route('/background', methods=['GET'])
def get_background():
    if request.method == 'GET':
        id = request.args.get('id')
        special_rules_string = request.args.get('specialRules')
        special_rules_list = [rule.strip() for rule in special_rules_string.split(';') if rule.strip()]
        special_rules_dict = {rule: '' for rule in special_rules_list}

        heroic_actions_string = request.args.get('heroicActions')
        heroic_actions_list = [rule.strip() for rule in heroic_actions_string.split(';') if rule.strip()]
        heroic_actions_dict = {rule: '' for rule in heroic_actions_list}

        try:
            with conn.cursor() as cur:
                cur.execute("SELECT alignment FROM adventurers WHERE id = %s", (id,))
                result = cur.fetchone()
                alignment = result[0] if result else None

            with conn.cursor() as cur:
                cur.execute("SELECT tribe FROM adventurers WHERE id = %s", (id,))
                result = cur.fetchone()
                tribe = result[0] if result else None

            sp_dict = {}
            with conn.cursor() as cur:
                for key in special_rules_dict.keys():
                    cur.execute("SELECT name, description FROM special_rules WHERE keyword = %s", (key,))
                    result = cur.fetchone()
                    name = result[0] if result else None
                    description = result[1] if result else None
                    sp_dict[key] = (name, description)

            ha_dict = {}
            with conn.cursor() as cur:
                for key in heroic_actions_dict.keys():
                    cur.execute("SELECT name, description FROM heroic_actions WHERE keyword = %s", (key,))
                    result = cur.fetchone()
                    description = result[0] if result else None
                    name = result[0] if result else None
                    description = result[1] if result else None
                    ha_dict[key] = (name, description)

            response_dict = {
                'alignment': alignment,
                'tribe': tribe,
                'specialRules': sp_dict,
                'heroicActions': ha_dict
            }
            return jsonify(response_dict), 200
        except psycopg2.Error as e:
            print(e)
            return "Get error", 500
        finally :
            cur.close()

@app.route('/alignment', methods=['PUT'])
def put_alignment():
    if request.method == 'PUT':
        id = request.json.get('id')
        alignment = request.json.get('alignment')

        try:
            cur = conn.cursor()
            cur.execute("UPDATE adventurers SET alignment = %s WHERE id = %s",
                        (alignment, id))
            conn.commit()
            return "OK", 200
        except psycopg2.Error as e:
            print(e)
            conn.rollback()
            return "Update error", 500
        finally :
            cur.close()
        
@app.route('/tribe', methods=['PUT'])
def put_tribe():
    if request.method == 'PUT':
        id = request.json.get('id')
        tribe = request.json.get('tribe')
        special_rule = request.json.get('special_rule')
        if tribe == "Sedetani":
            languages = tribe
        else:
            languages = tribe + ";Sedetani"

        try:
            cur = conn.cursor()
            cur.execute("DELETE FROM adventurer_special_rules WHERE adventurer_id = %s", (id,))
            cur.execute("UPDATE adventurers SET tribe = %s, languages = %s WHERE id = %s",
                        (tribe, languages, id))
            cur.execute("INSERT INTO adventurer_special_rules (adventurer_id, keyword) VALUES (%s, %s)",
                        (id, special_rule))
            conn.commit()
            return "OK", 200
        except psycopg2.Error as e:
            print(e)
            conn.rollback()
            return "Update error", 500
        finally :
            cur.close()

@app.route('/background', methods=['PUT'])
def put_background():
    if request.method == 'PUT':
        id = request.json.get('id')
        move = request.json.get('move')
        fight = request.json.get('fight')
        shoot = request.json.get('shoot')
        lethality = request.json.get('lethality')
        defence = request.json.get('defence')
        attacks = request.json.get('attacks')
        wounds = request.json.get('wounds')
        courage = request.json.get('courage')
        might = request.json.get('might')
        will = request.json.get('will')
        fate = request.json.get('fate')
        athletics = int(request.json.get('athletics', 0))
        finesse = int(request.json.get('finesse', 0))
        practise = int(request.json.get('practise', 0))
        cleverness = int(request.json.get('cleverness', 0))
        charisma = int(request.json.get('charisma', 0))
        erudition = int(request.json.get('erudition', 0))
        wargear = request.json.get('wargear')
        knownWargear = request.json.get('knownWargear')
        adept = request.json.get('adept')
        points = request.json.get('points')
        special_rules = request.json.get('specialRules')
        heroic_actions = request.json.get('heroicActions')     
        magical_powers = request.json.get('magicalPowers')

        print(id)
        print(knownWargear)

        try:
            cur = conn.cursor()
            cur.execute("SELECT athletics_natural, finesse_natural, practise_natural, cleverness_natural, charisma_natural, erudition_natural FROM adventurers WHERE id = %s", (id,))

            result = cur.fetchone()
            athletics_natural, finesse_natural, practise_natural, cleverness_natural, charisma_natural, erudition_natural = int(result[0]), int(result[1]), int(result[2]), int(result[3]), int(result[4]), int(result[5]) if result else None

            vigour_modifier = athletics_natural + athletics
            stamina_modifier = athletics_natural + athletics
            jump_modifier = athletics_natural + athletics
            ride_modifier = athletics_natural + athletics
            swim_modifier = int((athletics_natural + athletics + finesse + finesse_natural) / 2)
            climb_modifier = int((athletics_natural + athletics + finesse + finesse_natural) / 2)
            agility_modifier = finesse_natural + finesse
            sleight_of_hand_modifier = finesse_natural + finesse
            stealth_modifier = finesse_natural + finesse
            tinkerer_modifier = int((practise_natural + practise + finesse + finesse_natural) / 2)
            craft_modifier = int((practise_natural + practise + finesse + finesse_natural) / 2)
            reflex_modifier = practise_natural + practise
            perception_modifier = practise_natural + practise
            track_modifier = practise_natural + practise
            pathfind_modifier = int((practise_natural + practise + cleverness_natural + cleverness) / 2)
            survival_modifier = int((practise_natural + practise + cleverness_natural + cleverness) / 2)
            work_modifier = cleverness_natural + cleverness
            reason_modifier = cleverness_natural + cleverness
            learn_modifier = cleverness_natural + cleverness
            deceive_modifier = int((charisma_natural + charisma + cleverness_natural + cleverness) / 2)
            impersonate_modifier = int((charisma_natural + charisma + cleverness_natural + cleverness) / 2)
            command_modifier = charisma_natural + charisma
            diplomacy_modifier = charisma_natural + charisma
            intimidation_modifier = charisma_natural + charisma
            gather_information_modifier = int((charisma_natural + charisma + cleverness_natural + cleverness) / 2)
            artistic_performance_modifier = int((charisma_natural + charisma + cleverness_natural + cleverness) / 2)
            first_aid_modifier = erudition_natural + erudition
            medical_treatment_modifier = erudition_natural + erudition
            knowledge_modifier = erudition_natural + erudition
            scholar_acumen_modifier = erudition_natural + erudition
            
            vigour = getExpertise(vigour_modifier)
            stamina = getExpertise(stamina_modifier)
            jump = getExpertise(jump_modifier)
            ride = getExpertise(ride_modifier)
            swim = getExpertise(swim_modifier)
            climb = getExpertise(climb_modifier)
            agility = getExpertise(agility_modifier)
            sleight_of_hand = getExpertise(sleight_of_hand_modifier)
            stealth = getExpertise(stealth_modifier)
            tinkerer = getExpertise(tinkerer_modifier)
            craft = getExpertise(craft_modifier)
            reflex = getExpertise(reflex_modifier)
            perception = getExpertise(perception_modifier)
            track = getExpertise(track_modifier)
            pathfind = getExpertise(pathfind_modifier)
            survival = getExpertise(survival_modifier)
            work = getExpertise(work_modifier)
            reason = getExpertise(reason_modifier)
            learn = getExpertise(learn_modifier)
            deceive = getExpertise(deceive_modifier)
            impersonate = getExpertise(impersonate_modifier)
            command = getExpertise(command_modifier)
            diplomacy = getExpertise(diplomacy_modifier)
            intimidation = getExpertise(intimidation_modifier)
            gather_information = getExpertise(gather_information_modifier)
            artistic_performance = getExpertise(artistic_performance_modifier)
            first_aid = getExpertise(first_aid_modifier)
            medical_treatment = getExpertise(medical_treatment_modifier)
            knowledge = getExpertise(knowledge_modifier)
            scholar_acumen = getExpertise(scholar_acumen_modifier)

            cur.execute("""
                UPDATE adventurers
                SET move = %s,
                    fight = %s,
                    shoot = %s,
                    lethality = %s,
                    defence = %s,
                    attacks = %s,
                    wounds = %s,
                    courage = %s,
                    might = %s,
                    will = %s,
                    fate = %s,
                    athletics_background = %s,
                    finesse_background = %s,
                    practise_background = %s,
                    cleverness_background = %s,
                    charisma_background = %s,
                    erudition_background = %s,
                    gear = %s,
                    known_wargear = %s,
                    adept = %s,
                    points = %s,
                    vigour = %s,
                    stamina = %s,
                    jump = %s,
                    ride = %s,
                    swim = %s,
                    climb = %s,
                    agility = %s,
                    sleight_of_hand = %s,
                    stealth = %s,
                    tinkerer = %s,
                    craft = %s,
                    reflex = %s,
                    perception = %s,
                    track = %s,
                    pathfind = %s,
                    survival = %s,
                    work = %s,
                    reason = %s,
                    learn = %s,
                    deceive = %s,
                    impersonate = %s,
                    command = %s,
                    diplomacy = %s,
                    intimidation = %s,
                    gather_information = %s,
                    artistic_performance = %s,
                    first_aid = %s,
                    medical_treatment = %s,
                    knowledge = %s,
                    scholar_acumen = %s,
                    vigour_modifier = %s,
                    stamina_modifier = %s,
                    jump_modifier = %s,
                    ride_modifier = %s,
                    swim_modifier = %s,
                    climb_modifier = %s,
                    agility_modifier = %s,
                    sleight_of_hand_modifier = %s,
                    stealth_modifier = %s,
                    tinkerer_modifier = %s,
                    craft_modifier = %s,
                    reflex_modifier = %s,
                    perception_modifier = %s,
                    track_modifier = %s,
                    pathfind_modifier = %s,
                    survival_modifier = %s,
                    work_modifier = %s,
                    reason_modifier = %s,
                    learn_modifier = %s,
                    deceive_modifier = %s,
                    impersonate_modifier = %s,
                    command_modifier = %s,
                    diplomacy_modifier = %s,
                    intimidation_modifier = %s,
                    gather_information_modifier = %s,
                    artistic_performance_modifier = %s,
                    first_aid_modifier = %s,
                    medical_treatment_modifier = %s,
                    knowledge_modifier = %s,
                    scholar_acumen_modifier = %s
                WHERE id = %s
            """, (
                move, fight, shoot, lethality, defence, attacks, wounds, courage, might, will, fate,
                athletics, finesse, practise, cleverness, charisma, erudition, wargear, knownWargear, adept, points,
                vigour, stamina, jump, ride, swim, climb, agility, sleight_of_hand, stealth, tinkerer, craft, reflex,
                perception, track, pathfind, survival, work, reason, learn, deceive, impersonate, command, diplomacy,
                intimidation, gather_information, artistic_performance, first_aid, medical_treatment, knowledge, scholar_acumen,
                vigour_modifier, stamina_modifier, jump_modifier, ride_modifier, swim_modifier, climb_modifier,
                agility_modifier, sleight_of_hand_modifier, stealth_modifier, tinkerer_modifier, craft_modifier,
                reflex_modifier, perception_modifier, track_modifier, pathfind_modifier, survival_modifier,
                work_modifier, reason_modifier, learn_modifier, deceive_modifier, impersonate_modifier,
                command_modifier, diplomacy_modifier, intimidation_modifier, gather_information_modifier,
                artistic_performance_modifier, first_aid_modifier, medical_treatment_modifier, knowledge_modifier,
                scholar_acumen_modifier,
                id
            ))

            cur.execute("DELETE FROM adventurer_heroic_actions WHERE adventurer_id = %s", (id,))
            cur.execute("DELETE FROM adventurer_heroic_actions WHERE adventurer_id = %s", (id,))

            for special_rule in special_rules:
                if "-" in special_rule:
                    special_rule_split = special_rule.split("-")
                    parameters = ";".join(special_rule_split[1:])

                    print(special_rule_split[0])
                    
                    print(parameters)

                    cur.execute("INSERT INTO adventurer_special_rules (adventurer_id, keyword, parameters) VALUES (%s, %s, %s)",
                        (id, special_rule_split[0], parameters))
                else:
                    cur.execute("INSERT INTO adventurer_special_rules (adventurer_id, keyword) VALUES (%s, %s)",
                        (id, special_rule))
            
            for heroic_action in heroic_actions:
                cur.execute("INSERT INTO adventurer_heroic_actions (adventurer_id, keyword) VALUES (%s, %s)",
                        (id, heroic_action))
            for magical_power in magical_powers:
                cur.execute("INSERT INTO adventurer_magical_powers (adventurer_id, keyword, casting_value) VALUES (%s, %s, %s)",
                        (id, magical_power, magical_powers[magical_power]))

            conn.commit()
            return "OK", 200
        except psycopg2.Error as e:
            print(e)
            conn.rollback()
            return "Update error", 500
        finally :
            cur.close()

if __name__ == '__main__':
    app.run(debug=True)