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

@app.route('/custom', methods=['GET'])
def get_custom():
    if request.method == 'GET':
        id = request.args.get('id')
        try:
            with conn.cursor() as cur:
                cur.execute("SELECT points FROM adventurers WHERE id = %s", (id,))
                result = cur.fetchone()
                points = result[0] if result else None

            response_dict = {
                'points': points,
            }
            return jsonify(response_dict), 200
        except psycopg2.Error as e:
            print(e)
            return "Get error", 500
        finally :
            cur.close()

@app.route('/swap', methods=['GET'])
def get_swap():
    if request.method == 'GET':
        id = request.args.get('id')
        try:
            with conn.cursor() as cur:
                cur.execute("SELECT Athletics_Natural, Finesse_Natural, Practise_Natural, Cleverness_Natural, Charisma_Natural, Erudition_Natural, Athletics_Background, Finesse_Background, Practise_Background, Cleverness_Background, Charisma_Background, Erudition_Background FROM adventurers WHERE id = %s", (id,))
                result = cur.fetchone()
                skills = result[0], result[1], result[2], result[3], result[4], result[5], result[6], result[7], result[8], result[9], result[10], result[11] if result else None

            response_dict = {
                'skills': skills,
            }
            return jsonify(response_dict), 200
        except psycopg2.Error as e:
            print(e)
            return "Get error", 500
        finally :
            cur.close()

@app.route('/upgrade', methods=['GET'])
def get_upgrade():
    if request.method == 'GET':
        id = request.args.get('id')
        try:
            with conn.cursor() as cur:
                cur.execute("SELECT Athletics_Natural, Finesse_Natural, Practise_Natural, Cleverness_Natural, Charisma_Natural, Erudition_Natural, Athletics_Background, Finesse_Background, Practise_Background, Cleverness_Background, Charisma_Background, Erudition_Background, vigour, stamina, jump, ride, swim, climb, agility, sleight_of_hand, stealth, tinkerer, craft, reflex, perception, track, pathfind, survival, work, reason, learn, deceive, impersonate, command, diplomacy, intimidation, gather_information, artistic_performance, first_aid, medical_treatment, knowledge, scholar_acumen, vigour_upgrade, stamina_upgrade, jump_upgrade, ride_upgrade, swim_upgrade, climb_upgrade, agility_upgrade, sleight_of_hand_upgrade, stealth_upgrade, tinkerer_upgrade, craft_upgrade, reflex_upgrade, perception_upgrade, track_upgrade, pathfind_upgrade, survival_upgrade, work_upgrade, reason_upgrade, learn_upgrade, deceive_upgrade, impersonate_upgrade, command_upgrade, diplomacy_upgrade, intimidation_upgrade, gather_information_upgrade, artistic_performance_upgrade, first_aid_upgrade, medical_treatment_upgrade, knowledge_upgrade, scholar_acumen_upgrade FROM adventurers WHERE id = %s", (id,))
                result = cur.fetchone()
                natural = result[0:6] if result else None
                background = result[6:12] if result else None
                modifiers = result[12:42] if result else None
                upgrades = result[42:72] if result else None
            
            response_dict = {
                'natural': natural,
                'background': background,
                'modifiers': modifiers,
                'upgrades': upgrades,
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

        magical_powers_string = request.args.get('magicalPowers')
        magical_powers_list = [rule.strip() for rule in magical_powers_string.split(';') if rule.strip()]
        magical_powers_dict = {rule: '' for rule in magical_powers_list}

        print(magical_powers_dict)

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

            mp_dict = {}
            with conn.cursor() as cur:
                for key in magical_powers_dict.keys():
                    cur.execute("SELECT name, description FROM magical_powers WHERE keyword = %s", (key,))
                    result = cur.fetchone()
                    description = result[0] if result else None
                    name = result[0] if result else None
                    description = result[1] if result else None
                    mp_dict[key] = (name, description)

            print(mp_dict)

            response_dict = {
                'alignment': alignment,
                'tribe': tribe,
                'specialRules': sp_dict,
                'heroicActions': ha_dict,
                'magicalPowers': mp_dict
            }
            return jsonify(response_dict), 200
        except psycopg2.Error as e:
            print(e)
            return "Get error", 500
        finally :
            cur.close()

@app.route('/swap', methods=['PUT'])
def put_swap():
    if request.method == 'PUT':
        id = request.json.get('id')
        points = request.json.get('points')
        skills = request.json.get('skills')

        print(id)
        print(skills)
        print(points)

        try:
            cur = conn.cursor()
            cur.execute("UPDATE adventurers SET Athletics_Natural = %s, Finesse_Natural = %s, Practise_Natural = %s, Cleverness_Natural = %s, Charisma_Natural = %s, Erudition_Natural = %s, Athletics_Background = %s, Finesse_Background = %s, Practise_Background = %s, Cleverness_Background = %s, Charisma_Background = %s, Erudition_Background = %s, points = points - %s WHERE id = %s",
                                    (skills[0], skills[1], skills[2], skills[3], skills[4], skills[5], skills[6], skills[7], skills[8], skills[9], skills[10], skills[11], points, id))
            conn.commit()
            return "OK", 200
        except psycopg2.Error as e:
            print(e)
            conn.rollback()
            return "Update error", 500
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
        background = request.json.get('background')
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
        points = 63 - int(request.json.get('points'))
        special_rules = request.json.get('specialRules')
        heroic_actions = request.json.get('heroicActions')     
        magical_powers = request.json.get('magicalPowers')

        try:
            cur = conn.cursor()
            cur.execute("SELECT athletics_natural, finesse_natural, practise_natural, cleverness_natural, charisma_natural, erudition_natural FROM adventurers WHERE id = %s", (id,))

            result = cur.fetchone()
            athletics_natural, finesse_natural, practise_natural, cleverness_natural, charisma_natural, erudition_natural = int(result[0]), int(result[1]), int(result[2]), int(result[3]), int(result[4]), int(result[5]) if result else None

            vigour_upgrade = 1
            stamina_upgrade = 1
            jump_upgrade = 1
            ride_upgrade = 1
            swim_upgrade = 1
            climb_upgrade = 1
            agility_upgrade = 1
            sleight_of_hand_upgrade = 1
            stealth_upgrade = 1
            tinkerer_upgrade = 1
            craft_upgrade = 1
            reflex_upgrade = 1
            perception_upgrade = 1
            track_upgrade = 1
            pathfind_upgrade = 1
            survival_upgrade = 1
            work_upgrade = 1
            reason_upgrade = 1
            learn_upgrade = 1
            deceive_upgrade = 1
            impersonate_upgrade = 1
            command_upgrade = 1
            diplomacy_upgrade = 1
            intimidation_upgrade = 1
            gather_information_upgrade = 1
            artistic_performance_upgrade = 1
            first_aid_upgrade = 1
            medical_treatment_upgrade = 1
            knowledge_upgrade = 1
            scholar_acumen_upgrade = 1

            vigour = athletics_natural + athletics + 1
            stamina = athletics_natural + athletics + 1
            jump = athletics_natural + athletics + 1
            ride = athletics_natural + athletics + 1
            swim = int((athletics_natural + athletics + finesse + finesse_natural) / 2) + 1
            climb = int((athletics_natural + athletics + finesse + finesse_natural) / 2) + 1
            agility = finesse_natural + finesse + 1
            sleight_of_hand = finesse_natural + finesse + 1
            stealth = finesse_natural + finesse + 1
            tinkerer = int((practise_natural + practise + finesse + finesse_natural) / 2) + 1
            craft = int((practise_natural + practise + finesse + finesse_natural) / 2) + 1
            reflex = practise_natural + practise + 1
            perception = practise_natural + practise + 1
            track = practise_natural + practise + 1
            pathfind = int((practise_natural + practise + cleverness_natural + cleverness) / 2) + 1
            survival = int((practise_natural + practise + cleverness_natural + cleverness) / 2) + 1
            work = cleverness_natural + cleverness + 1
            reason = cleverness_natural + cleverness + 1
            learn = cleverness_natural + cleverness + 1
            deceive = int((charisma_natural + charisma + cleverness_natural + cleverness) / 2) + 1
            impersonate = int((charisma_natural + charisma + cleverness_natural + cleverness) / 2) + 1
            command = charisma_natural + charisma + 1
            diplomacy = charisma_natural + charisma + 1
            intimidation = charisma_natural + charisma + 1
            gather_information = int((charisma_natural + charisma + cleverness_natural + cleverness) / 2) + 1
            artistic_performance = int((charisma_natural + charisma + cleverness_natural + cleverness) / 2) + 1
            first_aid = erudition_natural + erudition + 1
            medical_treatment = erudition_natural + erudition + 1
            knowledge = erudition_natural + erudition + 1
            scholar_acumen = erudition_natural + erudition + 1

            cur.execute("""
                UPDATE adventurers
                SET background = %s,
                    move = %s,
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
                    vigour_upgrade = %s,
                    stamina_upgrade = %s,
                    jump_upgrade = %s,
                    ride_upgrade = %s,
                    swim_upgrade = %s,
                    climb_upgrade = %s,
                    agility_upgrade = %s,
                    sleight_of_hand_upgrade = %s,
                    stealth_upgrade = %s,
                    tinkerer_upgrade = %s,
                    craft_upgrade = %s,
                    reflex_upgrade = %s,
                    perception_upgrade = %s,
                    track_upgrade = %s,
                    pathfind_upgrade = %s,
                    survival_upgrade = %s,
                    work_upgrade = %s,
                    reason_upgrade = %s,
                    learn_upgrade = %s,
                    deceive_upgrade = %s,
                    impersonate_upgrade = %s,
                    command_upgrade = %s,
                    diplomacy_upgrade = %s,
                    intimidation_upgrade = %s,
                    gather_information_upgrade = %s,
                    artistic_performance_upgrade = %s,
                    first_aid_upgrade = %s,
                    medical_treatment_upgrade = %s,
                    knowledge_upgrade = %s,
                    scholar_acumen_upgrade = %s
                WHERE id = %s
            """, (
                background, move, fight, shoot, lethality, defence, attacks, wounds, courage, might, will, fate,
                athletics, finesse, practise, cleverness, charisma, erudition, wargear, knownWargear, adept, points,
                vigour, stamina, jump, ride, swim, climb, agility, sleight_of_hand, stealth, tinkerer, craft, reflex,
                perception, track, pathfind, survival, work, reason, learn, deceive, impersonate, command, diplomacy,
                intimidation, gather_information, artistic_performance, first_aid, medical_treatment, knowledge, scholar_acumen,
                vigour_upgrade, stamina_upgrade, jump_upgrade, ride_upgrade, swim_upgrade, climb_upgrade,
                agility_upgrade, sleight_of_hand_upgrade, stealth_upgrade, tinkerer_upgrade, craft_upgrade,
                reflex_upgrade, perception_upgrade, track_upgrade, pathfind_upgrade, survival_upgrade,
                work_upgrade, reason_upgrade, learn_upgrade, deceive_upgrade, impersonate_upgrade,
                command_upgrade, diplomacy_upgrade, intimidation_upgrade, gather_information_upgrade,
                artistic_performance_upgrade, first_aid_upgrade, medical_treatment_upgrade, knowledge_upgrade,
                scholar_acumen_upgrade,
                id
            ))

            cur.execute("DELETE FROM adventurer_heroic_actions WHERE adventurer_id = %s", (id,))
            cur.execute("DELETE FROM adventurer_magical_powers WHERE adventurer_id = %s", (id,))

            for special_rule in special_rules:
                if "-" in special_rule:
                    special_rule_split = special_rule.split("-")
                    parameters = ";".join(special_rule_split[1:])

                    cur.execute("INSERT INTO adventurer_special_rules (adventurer_id, keyword, parameters) VALUES (%s, %s, %s)",
                        (id, special_rule_split[0], parameters))
                else:
                    cur.execute("INSERT INTO adventurer_special_rules (adventurer_id, keyword) VALUES (%s, %s)",
                        (id, special_rule))
            
            for heroic_action in heroic_actions:
                cur.execute("INSERT INTO adventurer_heroic_actions (adventurer_id, keyword) VALUES (%s, %s)",
                        (id, heroic_action))
            for magical_power in magical_powers:
                if len(magical_power) > 2:
                    cur.execute("INSERT INTO adventurer_magical_powers (adventurer_id, keyword, casting_value, parameters) VALUES (%s, %s, %s, %s)",
                        (id, magical_power[0], magical_power[1], magical_power[2]))
                else:
                    cur.execute("INSERT INTO adventurer_magical_powers (adventurer_id, keyword, casting_value) VALUES (%s, %s, %s)",
                            (id, magical_power[0], magical_power[1]))

            conn.commit()
            return "OK", 200
        except psycopg2.Error as e:
            print(e)
            conn.rollback()
            return "Update error", 500
        finally :
            cur.close()

@app.route('/upgrade', methods=['PUT'])
def put_upgrade():
    if request.method == 'PUT':
        id = request.json.get('id')
        modifiers = request.json.get('modifiers')
        upgrades = request.json.get('upgrades')
        points = request.json.get('points')

        try:
            cur = conn.cursor()

            cur.execute("""
                UPDATE adventurers
                SET points = points - %s,
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
                    vigour_upgrade = %s,
                    stamina_upgrade = %s,
                    jump_upgrade = %s,
                    ride_upgrade = %s,
                    swim_upgrade = %s,
                    climb_upgrade = %s,
                    agility_upgrade = %s,
                    sleight_of_hand_upgrade = %s,
                    stealth_upgrade = %s,
                    tinkerer_upgrade = %s,
                    craft_upgrade = %s,
                    reflex_upgrade = %s,
                    perception_upgrade = %s,
                    track_upgrade = %s,
                    pathfind_upgrade = %s,
                    survival_upgrade = %s,
                    work_upgrade = %s,
                    reason_upgrade = %s,
                    learn_upgrade = %s,
                    deceive_upgrade = %s,
                    impersonate_upgrade = %s,
                    command_upgrade = %s,
                    diplomacy_upgrade = %s,
                    intimidation_upgrade = %s,
                    gather_information_upgrade = %s,
                    artistic_performance_upgrade = %s,
                    first_aid_upgrade = %s,
                    medical_treatment_upgrade = %s,
                    knowledge_upgrade = %s,
                    scholar_acumen_upgrade = %s
                WHERE id = %s
            """, (
                points, modifiers[0], modifiers[1], modifiers[2], modifiers[3], modifiers[4], modifiers[5], modifiers[6], modifiers[7], modifiers[8], modifiers[9], modifiers[10], modifiers[11], modifiers[12], modifiers[13], modifiers[14], modifiers[15], modifiers[16], modifiers[17], modifiers[18], modifiers[19], modifiers[20], modifiers[21], modifiers[22], modifiers[23], modifiers[24], modifiers[25], modifiers[26], modifiers[27], modifiers[28], modifiers[29], upgrades[0], upgrades[1], upgrades[2], upgrades[3], upgrades[4], upgrades[5], upgrades[6], upgrades[7], upgrades[8], upgrades[9], upgrades[10], upgrades[11], upgrades[12], upgrades[13], upgrades[14], upgrades[15], upgrades[16], upgrades[17], upgrades[18], upgrades[19], upgrades[20], upgrades[21], upgrades[22], upgrades[23], upgrades[24], upgrades[25], upgrades[26], upgrades[27], upgrades[28], upgrades[29],
                id
            ))

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