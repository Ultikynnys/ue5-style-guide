## Rule of Thumb

**Store assets with their clear owner; use collections for assets without a specific owner. This project's audio and map rules take precedence.**

* **For non-audio, non-level assets, clear ownership comes first.** Keep an asset with the character, weapon, interactable, screen, effect, or system it serves, even when a collection exists for its type. Player-specific art and supporting resources belong in `Art/Characters/Player`; player gameplay Blueprints and code-only supporting assets belong in `Blueprint/Characters/Player`. Keep each set together within that art/code split.
* **Otherwise, use the appropriate collection.** Use a collection only for generic assets or resources with no clear defining owner, such as `Art/Materials`, `Art/Textures`, `Art/Environment`, `FX`, or `UI`. Multiple consumers alone never move an asset: keep it with its defining owner when that association remains clear. Do not guess an owner or create a new folder just to give an asset somewhere to go.
* **Project-specific exceptions take precedence.** All audio resources always stay in the `SFX` collection, including music and sounds owned by one character, weapon, screen, or system. All level assets stay under `Maps`, including owner-specific and test levels, so map discovery and builds have one entry point.

A player's animations, Animation Blueprints, skeletal meshes, skeletons, materials, textures, and effects can all serve that character. Splitting the set into a collection for every type scatters its dependencies. Keep it together unless a supporting type grows enough to earn a sub-folder under the rules below. Asset type prefixes and context labels still apply wherever an asset lives.

**Use the fewest folders that make assets easy to find, and follow the structure already there.** Reuse existing owner folders rather than creating parallel trees. This placement policy does not require a wholesale migration of existing content. As a rule of thumb, around fifteen assets of the same supporting type may warrant a sub-folder, but split only when it makes the set easier to browse. See [Content Directory Structure](#content-directory-structure) for the detailed rules.

## Principles

These principles have been adapted from the [idiomatic.js style guide](https://github.com/rwaldron/idiomatic.js/).

### If your UE5 project already has a style guide, you should follow it

Respect a pre-existing style guide. Where it and this guide disagree, the existing guide wins.

Style guides are living documents: propose changes to both when a change benefits everyone.

> #### "Arguments over style are pointless. There should be a style guide, and you should follow it."
> [_Rebecca Murphey_](https://rmurphey.com)

### All structure, assets, and code in any Unreal Engine 5 project should look like a single person created it, no matter how many people contributed

A consistent style guide removes guesswork. Once you know the conventions, you can focus on the work; naming and organizing become automatic.

This guide follows best practices, so following it also minimizes hard-to-track issues.

### Friends do not let friends have bad style

If someone works against a style guide, or has none, correct them.

Consistency makes it easier to give and receive help, whether on a team or in a community such as [Unreal Source](https://unrealsource.com/). Nobody enjoys untangling Blueprint spaghetti or deciphering unclear asset names.

A different guide is fine if it is clear and consistent; adapt to it. If there is no guide, point the team here.

### A team without a style guide is no team of mine

When joining a team, ask early: "Do you have a style guide?" If not, be skeptical of how consistently they work together.

### Don't Break The Law

Not legal advice: do not bring illegal content or behavior into a project. For example:

* Don't distribute content you have no right to distribute
* Don't infringe copyrights or trademarks
* Don't steal content
* Follow licensing terms, e.g. attribute when attribution is required

### Avoid Folder Sprawl

More folders do not make assets easier to find. Deep, per-asset folder trees slow people down and invite duplicate assets. Prefer a few broad, clearly named folders that group related content where people expect it. A set large enough to genuinely earn its own folder is not sprawl: see [Folder Names](#folder-names).

For large collections such as `Art/Environment`, follow the [Collections](#collections) layout shown in [Figure 1](#figure-1). A collection's name describes its browsing scope, not a reason to separate assets from a clear owner: `Art/Environment` holds reusable level-design assets, while an owned set keeps its dependencies together.

![Example of environment assets organized together in a browsable folder](https://raw.githubusercontent.com/Ultikynnys/ue5-style-guide/main/images/folder-organization-example.png)

**Figure 1.** The `Art/Environment` collection: static level-design assets grouped together in the Content Browser.

## Globally Enforced Opinions

**Forbidden Characters**


**Identifiers:** In any `Identifier` of any kind, **never** use the following unless absolutely forced to:

* White space of any kind
* Backward slashes `\`
* Symbols i.e. `#!@$%`
* Any Unicode character

Prefer only these characters when possible, matching the RegEx `[A-Za-z0-9_]+`:

* ABCDEFGHIJKLMNOPQRSTUVWXYZ
* abcdefghijklmnopqrstuvwxyz
* 1234567890
* _ (sparingly)

This maximizes compatibility of all data across every platform and tool, and avoids downtime from bad character handling in code you do not control.

## Asset Naming Conventions

Naming conventions are law. A conforming project is far easier to manage, search, parse, and maintain. The prefix rules below are exact and admit no variation; casing on bulk-imported assets is a deliberate exception, and [Folder Names](#folder-names) covers it.

These rules cover everything you author under `Content/Haeretica`. Plugins and third-party content keep their own naming schemes; leave external dependencies as they are rather than reorganizing them.

Most assets carry a prefix: a short form of the asset type, usually an acronym, followed by an underscore.

### Base Asset Name - `Prefix_BaseAssetName_Variant_Suffix`

An asset's _Base Asset Name_ identifies the group of related assets it belongs to. The full naming pattern is `Prefix_BaseAssetName_Variant_Suffix`.

`Prefix` and `Suffix` come from the asset type, via the type tables below and the [Suffixes](#suffixes) table.

`BaseAssetName` is a short, recognizable name for the group. If you have a character named Bob, all of Bob's assets use `Bob`.

For a specific variation, `Variant` is a short, recognizable name for the subset. Bob's skins keep `Bob` and add a `Variant`: 'Evil' is `Bob_Evil`, 'Retro' is `Bob_Retro`.

For a generic variation, `Variant` is a two-digit number starting at `01`: nondescript rocks are `Rock01`, `Rock02`, and so on. Three digits is almost never needed; past 100 assets, use different base names or chained variants instead.

Variants can be combined. Architectural visualization flooring might use the base name `Flooring` with variants like `Flooring_Marble01`, `Flooring_Maple01`, and `Flooring_Tile_Squares01`.

Audio in the `SFX` collection follows the same naming pattern: name sounds by association, `Prefix_WhoWhatWhich`, with variation numbers attached directly to the name, such as `S_PlayerHurt01`. See [SFX](#sfx) for the collection's storage and naming rules; the other naming rules still apply.


**Examples:**

**Bob Example**

| Asset Type              | Asset Name                                                 |
| ----------------------- | ---------------------------------------------------------- |
| Skeletal Mesh           | SKM_Bob                                                    |
| Material                | M_Bob                                                      |
| Texture (Diffuse/Albedo)| T_Bob_D                                                    |
| Texture (Normal)        | T_Bob_N                                                    |
| Texture (Evil Diffuse)  | T_Bob_Evil_D                                               |

**Rocks Example**

| Asset Type              | Asset Name                                                 |
| ----------------------- | ---------------------------------------------------------- |
| Static Mesh (01)        | SM_Rock01                                                 |
| Static Mesh (02)        | SM_Rock02                                                 |
| Static Mesh (03)        | SM_Rock03                                                 |
| Material                | M_Rock                                                     |
| Material Instance (Snow)| MI_Rock_Snow                                               |

#### Meshes

All mesh types: static, skeletal, destructible, and Chaos geometry collections.

| Asset Type              | Prefix     | Notes                            |
| ----------------------- | ---------- | -------------------------------- |
| Static Mesh             | SM_        |                                  |
| Static Mesh (FX)        | SM_FX_     | A static mesh used only by particle effects; keep it with its effect's owner, or in `FX/Meshes` when generic or shared with no clear owner. |
| Skeletal Mesh           | SKM_       |                                  |
| Destructible Mesh       | DM_        |                                  |
| Geometry Collection     | GC_        | Geometry grouped for Chaos simulation, fracture, and destruction; keep it with its owner, or in `Art/GeometryCollection` when reusable with no clear owner. |

#### Blueprint Types

Blueprint classes, plus the data types that support them, such as enumerations, structs, and interfaces, and editor-only utility variants.

| Asset Type              | Prefix     | Notes                            |
| ----------------------- | ---------- | -------------------------------- |
| Blueprint               | BP_        |                                  |
| Blueprint Component     | BPC_       | E.g. BPC_InventoryComponent      |
| Blueprint Function Library | BPFL_   |                                  |
| Blueprint Interface     | BPI_       |                                  |
| Blueprint Macro Library | BPML_      | Do not use macro libraries if possible. |
| Enumeration             | E_         |                                  |
| Structure               | ST_        |                                  |
| Tutorial Blueprint      | TBP_       |                                  |
| Camera Shake            | CS_        |                                  |
| Anim Notify             | AN_        |                                  |
| Widget Blueprint        | WBP_       |                                  |
| Editor Utility Blueprint | EUB_      |                                  |
| Editor Utility Widget    | EUW_      |                                  |

#### Materials

Keep a material with its clear owner, regardless of shading context. A generic mesh material belongs in [`Art/Materials`](#artmaterials). A context material (`M_UI_`, `M_FX_`, `M_Decal_`, `M_PP_`) used with no single owner belongs in its context collection, `UI/Materials`, `FX/Materials`, `Art/Decals`, or `Art/PostProcess`; an owned one stays with its owner. Context labels distinguish intended use even when an owner's folder contains several material types.

The only type labels are `PP`, `Decal`, `UI`, and `FX`; an `M_` material that carries none of them is a mesh material.

Use the required `PP`, `Decal`, `UI`, or `FX` label for a material authored for that context, as listed below. Ownership changes its folder, not its naming requirements. Material and texture settings can produce unexpected results when an asset is used in the wrong context.

| Asset Type                    | Prefix     | Notes                            |
| ----------------------------- | ---------- | -------------------------------- |
| Material                      | M_         | A mesh material; reuse it through instances. A type-tied material carries its label (`M_PP_`, `M_UI_`, `M_Decal_`, `M_FX_`). |
| Material (Post Process)       | M_PP_, MI_PP_ | Post-process (screenspace) materials, named with the `PP` label. |
| Material (UI)                 | M_UI_, MI_UI_ | Carry the `UI` label and stay with their owner; generic or shared instances with no clear owner live in `UI/Materials`, not the generic mesh material collection. |
| Material (FX)                 | M_FX_, MI_FX_ | Materials used only for particles; carry the `FX` label and stay with their owner, or in `FX/Materials` when generic or shared with no clear owner. |
| Material Function             | MF_        | A generic one lives in `Art/Materials/MaterialFunctions`; one a concept owns lives with it. |
| Material Instance             | MI_        | Lives with the asset it dresses (its folder, or a `Materials` sub-folder there); a generic instance that names no single asset lives in `Art/Materials/MaterialInstances`, or in its own set's folder when that set has one (`Art/Decals`, `Art/PostProcess`). |
| Material Parameter Collection | MPC_       |                                  |
| Subsurface Profile            | SP_        |                                  |
| Physical Materials            | PM_        |                                  |
| Decal                         | M_Decal_, MI_Decal_ | The `Decal` label goes right after the type, so a decal is named explicitly and cannot be misused as a mesh material. |

#### Textures

The same labels apply to textures (`T_PP_`, `T_Decal_`, `T_UI_`, `T_FX_`); a `T_` texture that carries none of them is a mesh texture.

Keep a texture with its clear owner, just like a material. Generic mesh textures belong in [`Art/Textures`](#arttextures). A context texture (`T_UI_`, `T_FX_`, `T_Decal_`, `T_PP_`) used with no single owner belongs in its context collection, `UI/Textures`, `FX/Textures`, `Art/Decals`, or `Art/PostProcess`; an owned one stays with its owner. Labels and texture settings describe use, not a mandatory collection destination.

Use the required context label for textures too, as listed below. Ownership changes their folder, not their naming requirements.

| Asset Type              | Prefix     | Notes                            |
| ----------------------- | ---------- | -------------------------------- |
| Texture                 | T_         | A texture with no suffix is implied to be Diffuse/Albedo/Base Color. |
| Texture (Post Process)  | T_PP_      | Post-process (screenspace) textures. |
| Texture (Decal)         | T_Decal_   | The `Decal` label goes right after the type. |
| Texture (UI)            | T_UI_      | UI textures; keep with their owner, or in `UI/Textures` when generic or shared with no clear owner. |
| Texture (FX)            | T_FX_      | Textures used only for particles; keep with their owner, or in `FX/Textures` when generic or shared with no clear owner. |
| Texture Cube            | TC_        |                                  |
| Media Texture           | MTX_       |                                  |
| Render Target           | RT_        |                                  |
| Cube Render Target      | RTC_       |                                  |
| Texture Light Profile   | TLP_       |                                  |

##### Texture Packing

Layers of texture data are often packed into one texture, e.g. Emissive, Roughness, and Ambient Occlusion as its Red, Green, and Blue channels. Stack the suffix letters to name it: `_ERO`.

> A Diffuse/Albedo's alpha channel commonly holds Alpha/Opacity, so adding `A` to `_D` or `_BC` is optional.

Do not pack four channels (RGBA) except for that alpha mask in the Diffuse/Albedo: a texture with alpha costs more than one without.

#### Miscellaneous

Asset types that fit no other category, such as data assets, curves, data tables, and input mappings.

| Asset Type                 | Prefix     | Notes                            |
| -------------------------- | ---------- | -------------------------------- |
| Aim Offset              | AO_        |                                  |
| Aim Offset 1D           | AO_        |                                  |
| Animation Blueprint     | ABP_       |                                  |
| Animation Composite     | AC_        |                                  |
| Animation Montage       | AM_        |                                  |
| Animation Sequence      | A_         |                                  |
| Blend Space             | BS_        |                                  |
| Blend Space 1D          | BS_        |                                  |
| Level Sequence          | LS_        |                                  |
| Morph Target            | MT_        |                                  |
| Rig                     | Rig_       |                                  |
| Control Rig             | CR_        |                                  |
| IK Rig                  | IK_        |                                  |
| Skeleton                | SK_        |                                  |
| AI Controller           | AIC_       |                                  |
| Behavior Tree           | BT_        |                                  |
| Blackboard              | BB_        |                                  |
| Decorator               | BTD_       |                                  |
| Service                 | BTS_       |                                  |
| Task                    | BTT_       |                                  |
| Environment Query       | EQS_       |                                  |
| Level / Map                |            | [Should be in a folder called Maps.](#maps) Level naming is in [Suffixes](#suffixes). |
| Animated Vector Field      | VFA_       |                                  |
| Camera Anim                | CA_        |                                  |
| Curve                     | C_         | A Color, Float, or Vector curve requires its subclass suffix from [Suffixes](#suffixes), since each subclass behaves differently: `C_PlayerDamage_Color`, `C_PlayerDamage_Float`, `C_PlayerDamage_Vector`. |
| Curve Table               | CT_        | A standalone asset type of its own, distinct from the Curve subclasses. |
| Data Asset                 | DA_        |                                  |
| Primary Data Asset         | PDA_       |                                  |
| Data Table                 | DT_        |                                  |
| Input Action               | IA_        |                                  |
| Input Mapping Context      | IMC_       |                                  |
| Foliage Type               | FT_        |                                  |
| Force Feedback Effect      | FFE_       |                                  |
| Landscape Grass Type       | LG_        |                                  |
| Landscape Layer            | LL_        |                                  |
| Matinee Data               | Matinee_   |                                  |
| Media Player               | MP_        |                                  |
| File Media Source          | FMS_       |                                  |
| Object Library             | OL_        |                                  |
| PCG Graph                  | PCG_       | Procedural content generation.   |
| Sprite Sheet               | SS_        |                                  |
| Static Vector Field        | VF_        |                                  |
| Substance Graph Instance   | SGI_       |                                  |
| Substance Instance Factory | SIF_       |                                  |
| Touch Interface Setup      | TI_        |                                  |
| Paper Flipbook          | PFB_       |                                  |
| Sprite                  | SPR_       |                                  |
| Sprite Atlas Group      | SPRG_      |                                  |
| Tile Map                | TM_        |                                  |
| Tile Set                | TS_        |                                  |
| Physics Asset           | PA_        |                                  |
| Dialogue Voice          | DV_        |                                  |
| Dialogue Wave           | DW_        |                                  |
| Media Sound Wave        | MSW_       |                                  |
| Reverb Effect           | Reverb_    |                                  |
| Sound Attenuation       | SA_        |                                  |
| Sound Class             | SC_        |                                  |
| Sound Concurrency       | SConcurrency_ | Name for the association or playback policy it serves. |
| Sound Cue               | Cue_       |                                  |
| Sound Mix               | Mix_       |                                  |
| MetaSound Source        | MSS_       |                                  |
| MetaSound Patch         | MSP_       |                                  |
| Sound Wave              | S_         |                                  |
| Font                    | F_         | Keep with its owner; generic or shared fonts with no clear owner live in `Art/Fonts`. |
| Font Face               | FF_        |                                  |
| Slate Brush             | Brush_     |                                  |
| Slate Widget Style      | Style_     |                                  |
| Particle System         | PS_        |                                  |
| Niagara System          | NS_        | The placeable VFX asset.         |
| Niagara Emitter         | NE_        |                                  |
| Niagara Module Script   | NM_        |                                  |
| Niagara Parameter Collection | NP_   |                                  |
| Niagara Parameter Collection (Instance) | NPI_ |                                  |
| Gameplay Ability        | GA_        |                                  |
| Gameplay Effect         | GE_        |                                  |
| Gameplay Cue Notify     | GCN_       |                                  |

### Suffixes

**Prefixes identify asset types. Suffixes express conceptual differences within an asset family**, including subclass distinctions such as Color, Float, and Vector curves under `C_`, a texture's normal or roughness role, a level's purpose, or an asset's work-in-progress status. A separate asset type takes its own prefix: Curve Table uses `CT_`, and Sound Concurrency uses `SConcurrency_`. The table below lists role and Curve subclass suffixes; prefixes are listed above. Omit an optional role suffix when there is no useful distinction to make, but a Curve always takes its Color, Float, or Vector subclass suffix because each subclass behaves differently. Instances retain their established prefixes (`MI_` for a material instance, `NPI_` for a Niagara Parameter Collection instance).

| Asset Type              | Suffix     | Notes                            |
| ----------------------- | ---------- | -------------------------------- |
| Texture (Diffuse/Albedo/Base Color) | _D / _BC | `_D` and `_BC` are interchangeable. |
| Texture (Normal)        | _N         |                                  |
| Texture (Roughness)     | _R         |                                  |
| Texture (Alpha/Opacity) | _A         |                                  |
| Texture (Ambient Occlusion) | _O     |                                  |
| Texture (Bump)          | _B         |                                  |
| Texture (Emissive)      | _E         |                                  |
| Texture (Mask)          | _Mask / _MSK | `_Mask` and `_MSK` are both allowed. |
| Texture (Specular)      | _S         |                                  |
| Texture (Metallic)      | _M         |                                  |
| Texture (Packed)        | _*         |                                  |
| Color Curve             | _Color     | Curve subclass: `C_PlayerDamage_Color`. |
| Float Curve             | _Float     | Curve subclass: `C_PlayerDamage_Float`. |
| Vector Curve            | _Vector    | Curve subclass: `C_PlayerDamage_Vector`. |

#### Work In Progress

`_WIP` is a status marker, and any asset can carry it. An experimental, unfinished, or prototype asset that is not meant to be used as it stands takes `_WIP` as its final suffix, after every other suffix: `BP_Shotgun_WIP`, `T_BrickWall_WIP`, `TestMap_WIP`.

The marker tells readers that an asset may change or be deleted. Add it when an asset is unfinished, and remove it only when the asset is production-ready. Do not ship assets whose names still carry `_WIP`.

`_WIP` applies to personal experiments as well as shared unfinished content. File these assets in their normal homes; the suffix communicates their status without requiring a separate testing folder.

#### Level Suffixes

Level suffixes are a special case. `_P`, `_Audio`, `_Light`, `_Geo`, and `_Gameplay` have fixed meanings, and each level holds only the content assigned to that role. Other suffixes can describe project-specific roles or segments.

A level without a suffix is monolithic: it contains the whole scene. This is reasonable for small scenes, tests, and one-off work handled by one person. Splitting a main menu into several level components, for example, would be overkill. For larger scenes, prefer separate components so several people can work without locking the same level.

| Asset Type              | Suffix     | Notes                            |
| ----------------------- | ---------- | -------------------------------- |
| Level (Persistent)      | _P         | The glue component: it holds nothing, and only references the level's other components, the ones that match the level name. |
| Level (Audio)           | _Audio     | Audio only.                      |
| Level (Lighting)        | _Light     | Lighting only: freestanding and decorative light sources. A light built into the architecture is geometry instead; see below. |
| Level (Geometry)        | _Geo       | Geometry only, including built-in architectural pieces that carry their own lights, such as a lit window. |
| Level (Gameplay)        | _Gameplay  | Gameplay only: enemies, spawn points, the Level Blueprint, and similar. |

Sort a component by what it is, not by whether it emits light. A freestanding lamp or a decorative light source belongs in `_Light`. A fixture that is part of the structure is geometry, even when it lights the scene: a lit window carries the wall mesh and glass along with its light, so its geometry is load-bearing and it belongs in `_Geo`. When a mesh and a light are authored as one architectural piece, keep them together in `_Geo` rather than splitting the mesh into `_Geo` and the light into `_Light`.

## Content Directory Structure

Directory structure is law too, on par with naming: the two go hand in hand, and breaking either causes chaos.

All content authored for the main project lives under `Content/Haeretica`. Plugins and external third-party dependencies retain their own roots and organization. The layout below describes this project's current top-level folders. DLC, patches, and sub-projects that ship separately are the exception: each gets its own top-level root. Because most assets carry their type in their prefix, these folders group by _purpose_; use the Content Browser's filters and search to narrow by type within a folder.

Apply the project's `SFX` and `Maps` exceptions first; otherwise choose the owner before choosing a type-based collection. Generic main assets stay at a collection's root: shared widget Blueprints sit flat in `UI`, generic Niagara systems at the root of `FX`, and generic environment meshes at the root of `Art/Environment`. An owned set with private dependencies may use a per-concept sub-folder under its owner; [Blueprint](#blueprint) covers the art/logic split. Common collections can exist from the start without pre-creating a folder for every supporting type that might someday appear.

Apply the ownership-first rule above to new content. It does not require flattening existing folders or migrating the whole project: moving assets, fixing redirectors, and checking references should serve a concrete organizational benefit.

**Example Project Content Structure**
<pre>
|-- Content
    |-- <a href="#use-a-top-level-folder-for-project-specific-assets">Haeretica</a>
        |-- <a href="#art">Art</a>
        |   |-- Characters
        |   |   |-- Mech
        |   |   |-- MeleeDummy
        |   |   |-- Player
        |   |   |-- Priestess
        |   |   |-- RangedDummy
        |   |   |-- Tank
        |   |-- Decals
        |   |-- Environment
        |   |   |-- Materials
        |   |   |-- Textures
        |   |-- Fonts
        |   |-- GeometryCollection
        |   |-- Interactables
        |   |-- LUT
        |   |-- <a href="#artmaterials">Materials</a>
        |   |   |-- MaterialInstances
        |   |   |-- MaterialFunctions
        |   |-- PhysicalMaterials
        |   |-- PostProcess
        |   |-- <a href="#arttextures">Textures</a>
        |   |-- Weapons
        |-- <a href="#blueprint">Blueprint</a>
        |   |-- Characters
        |   |-- Components
        |   |-- Consumables
        |   |-- GameModes
        |   |-- Interactables
        |   |-- Tools
        |   |-- UI
        |   |-- Weapons
        |-- <a href="#fx">FX</a>
        |   |-- Materials
        |   |-- Meshes
        |   |-- Textures
        |-- <a href="#maps">Maps</a>
        |   |-- ArenaLevel1
        |   |-- ArtTestLevel
        |   |-- Level1
        |   |-- Level2
        |   |-- Level3
        |   |-- LevelLibrary
        |   |-- MainMenu
        |   |-- TestLevels
        |-- <a href="#sfx">SFX</a>
        |   |-- Waves
        |   |-- Classes
        |   |-- Attenuation
        |-- <a href="#ui">UI</a>
            |-- Materials
            |-- Textures
</pre>

The reasons for this structure are listed in the following sub-sections.

### Folder Names

PascalCase is the project's preferred naming standard for folder names and asset base names, and the rules below follow from it. Use it for content authored for the project. Bulk-imported content that arrives with its own lowercase or snake_case names (a Megascan texture such as `T_wood_planks`, say) is left alone, since renaming hundreds of library assets buys nothing and severs the link back to the source.

#### Prefer PascalCase

PascalCase starts with a capital and capitalizes every following word, with no spaces: `DesertEagle`, `RocketPistol`, `ASeriesOfWords`. Use it for everything you name.

#### Never Use Spaces

Never use spaces: they break many engineering tools and batch processes. Keep the project root space-free too, for example `D:\Project`.

#### Never Use Unicode Characters And Other Symbols

A character named 'Zoë' gets the folder name `Zoe`. Unicode is worse than spaces for engineering tools, and parts of UE5 do not support it in paths at all.

A Unicode character in your computer's user name (say you are `Zoë`) breaks any project under `My Documents`; moving it somewhere like `D:\Project` usually fixes it.

### Use A Top Level Folder For Project Specific Assets

Every asset authored for the main project lives in `Content/Haeretica`. Plugins and external third-party dependencies retain their own roots; separately shipped DLC, sub-projects, and patches may use their own top-level folders.

The reasons follow.

#### No Global Assets

This follows the same principle as keeping code out of the global namespace. Assets scattered outside the project folder are harder to organize and distinguish from imported content.

Every asset needs a purpose to belong in the project. A folder called `Assets` is the opposite of that; it names no purpose, so do not create one.

#### Reduce Migration Conflicts

Teams routinely copy assets between projects. The Content Browser's Migrate tool copies both the selected assets and their dependencies.

Those dependencies are the danger. When assets sit outside a top level folder and two projects share similarly named or already-migrated assets, a migration can silently overwrite the existing ones.

Merge a migration safely with the Content Browser's 'Replace References' tool: assets outside your top level folder are clearly pending a merge. Once merged, remove obsolete migration folders after fixing their references. Retained third-party dependencies and separately shipped content may keep their own roots.


**Shared Material Example:**

Suppose you migrate a material `Content/M_Shared` into a project that has none: that works fine. Now an artist builds material instances on `Content/M_Shared`, and someone migrates a modular mesh set that also depends on a `Content/M_Shared`; Migrate is forced to copy that material too and overwrites the existing asset.

If the two versions differ in _any way_, you can break the project's entire material library and everything already migrated to it. A simple mesh migration can become a difficult repair job for someone unfamiliar with either version.

#### DLC, Sub-Projects, and Patches Are Easily Maintained

DLC and sub-projects that are either migrated out or simply not cooked in a build get their own top level content folder. That makes cooking DLC separately, and migrating sub-projects in and out, far easier. A patch that changes one asset's material or adds specific override behavior goes in its own patch folder, where it cannot break the core project.

### Top Level Folders

The current project uses the following top-level folders beneath its project folder:

* `Art` - Character and system art, plus generic visual asset collections. See [Art](#art).
* `Blueprint` - The Blueprints that make up the project's logic. See [Blueprint](#blueprint).
* `FX` - Generic or shared Niagara systems with no clear owner, and their visual-effect resources. Owned effects stay with their associated set. See [FX](#fx).
* `Maps` - All map files. See [Maps](#maps).
* `SFX` - All audio resources; a project-specific rule that overrides ownership-first placement. See [SFX](#sfx).
* `UI` - Shared widgets and screen-owned interface sets, with each screen's dependencies kept together. See [UI](#ui).

#### Art

In this project, `Art` holds character and system art alongside generic visual asset collections:

* `Art/Characters` - Character art, with a sub-folder per character (`Art/Characters/Priestess`).
* `Art/Decals` - Generic or shared decal materials, instances, and textures with no clear owner (`M_Decal_`, `MI_Decal_`, `T_Decal_`). Owned decals stay with their associated set and retain the same labels.
* `Art/Environment` - Reusable level-design sets and their supporting dependencies, including materials and textures; assets with a more specific owner stay with that owner. See [Collections](#collections) for its scope and layout.
* `Art/Fonts` - Generic or shared fonts with no clear owner; fonts specific to one screen or set stay with it. See [UI](#ui).
* `Art/GeometryCollection` - Generic destructible geometry with no clear owner. A breaking chair's private geometry collection stays with the chair, even when the chair appears in many levels. See [`Art/GeometryCollection`](#artgeometrycollection).
* `Art/LUT` - Generic or shared color lookup tables (LUTs) with no clear owner, used for color grading.
* `Art/Materials` - The home for the project's generic mesh materials, filed flat at the root. See [`Art/Materials`](#artmaterials).
  * `Art/Materials/MaterialInstances` - Generic material instances that name no single asset, such as a generic wall instance.
  * `Art/Materials/MaterialFunctions` - Generic material functions.
* `Art/PhysicalMaterials` - Generic or shared physical materials with no clear owner, used for surface responses such as footstep and impact effects.
* `Art/PostProcess` - Generic or shared post-process materials, instances, and textures with no clear owner (`M_PP_`, `MI_PP_`, `T_PP_`); owned sets stay with their associated folder.
* `Art/Textures` - The home for the project's generic mesh textures, filed flat. See [`Art/Textures`](#arttextures).

A gameplay system's owned art and supporting resources get a matching folder here, such as `Art/Weapons` or `Art/Tools`, mirroring its `Blueprint/<System>` folder. Art, animation, and effects stay on the art side; gameplay logic and code-only data stay in `Blueprint/<System>`. Characters are the clearest case, `Art/Characters/<Name>` beside `Blueprint/Characters/<Name>`. Reusing another character's art does not require duplicating it or inventing a matching art folder. Animation Blueprints are heavily authored by animators, so they are categorized as art and live with the animation assets they serve, despite the word Blueprint in their name. An Animation Blueprint holds no load-bearing code: it only defines how something moves visually, and the load-bearing code lives in its consumer, usually the character Blueprint. See [Blueprint](#blueprint).

#### Blueprint

`Blueprint` contains Blueprint-related types: gameplay Blueprints, their subtypes, and assets intended to support Blueprint logic, such as enumerations, structs, interfaces, data tables, input actions, behavior trees, blackboards, and environment queries. An asset does not belong here merely because a Blueprint references it; it must be a Blueprint-related type or serve a supporting role in Blueprint logic. Each system's gameplay logic and code-only supporting assets stay here, separate from its art: weapon logic lives in `Blueprint/Weapons`, while the weapon's meshes, materials, textures, animation, and effects live in `Art/Weapons`; interactables split the same way. Apart from the explicit `SFX` and `Maps` rules, type-based collections are fallback homes, not overrides for clear system ownership.

* `Blueprint/Components` - Actor components reusable across independent systems; a component clearly owned by one system stays with that system.
* `Blueprint/Characters`, `Blueprint/Weapons`, `Blueprint/Interactables`, `Blueprint/GameModes`, `Blueprint/Consumables`, and `Blueprint/Tools` - One folder per gameplay system, holding its gameplay Blueprints, placeable actors, interfaces, and other code-only support. Animation and Widget Blueprints follow the art and UI rules instead. Player and enemy Blueprints live together under `Blueprint/Characters`, mirroring `Art/Characters`.
* `Blueprint/<System>/Base` - The system's base classes and shared code-only supporting assets.
* `Blueprint/UI` - Interface-system gameplay logic, such as HUD classes, plus code-only UI data such as enumerations. Screen-specific support stays in the matching `Blueprint/UI/<Screen>` set; logic owned by another gameplay system stays with that system. Widgets and their visual dependencies follow [UI](#ui).

The `Base` sub-folder keeps two kinds of Blueprint apart from the rest of the system. The first is the base classes: a Blueprint is usually instanced from a base class, so a base class is never placed in a level and never used on its own, it exists to be inherited. The second is the code-only supporting assets every variant of the system shares. Just as a collection gathers one concept's assets in one place for browsing, `Base` gathers the system's shared assets, such as structs, data tables, and shared AI assets (behavior-tree tasks, services, and decorators, blackboards, and environment queries), instead of scattering them across the system's variant folders. The concrete Blueprints instanced from a base class, the ones used in game, live outside `Base`.

A `Base` sub-folder belongs only inside `Blueprint`, for base classes and shared code-only support. Shared art and non-audio resources stay in their owner's art set rather than following the code into `Base`; material parents and instances retain their `M_` and `MI_` prefixes wherever they live. Do not add a `Base` folder under `Art`, `FX`, `UI`, `SFX`, or any other top-level folder.

Base classes deserve a "don't touch these" reputation wherever they sit: a change there affects every child and can break the system project-wide. Designers make gameplay tweaks in child classes that expose the needed functionality, and world builders place prefab Blueprints from the system's other folders, leaving the base classes alone.

Prefer a flat folder. When the code resolves into a `Base` sub-folder plus concrete Blueprints at the root, keep those Blueprints flat, the way interactables does, as [Figure 2](#figure-2) shows:

![The Blueprint/Interactables folder in the Content Browser: interactable Blueprints flat at the root, with one Base sub-folder](https://raw.githubusercontent.com/Ultikynnys/ue5-style-guide/main/images/blueprint-interactables-flat.png)

**Figure 2.** `Blueprint/Interactables`: a flat structure, every interactable Blueprint at the root beside the shared `Base` folder.

Sort into a folder per item when a concept carries a lot of one-off, non-reusable assets, the way weapons and characters do: those cannot go in `Base`, so the concept needs a folder of its own, as [Figure 3](#figure-3) shows:

![The Blueprint/Weapons folder in the Content Browser: one sub-folder per weapon](https://raw.githubusercontent.com/Ultikynnys/ue5-style-guide/main/images/blueprint-weapons-per-concept.jpg)

**Figure 3.** `Blueprint/Weapons`: one folder per weapon for its logic and code-only data. Its art and effects belong in the matching `Art/Weapons` set.

#### FX

`FX` is the collection for generic Niagara Systems (`NS_`) and effects with no clear owner. Follow the layout in [Collections](#collections).

A system clearly owned by a weapon, character, or interactable stays with that owner's art, such as `Art/Weapons/Sword/NS_SwordTrail`. Keep its owned materials, textures, meshes, emitters, and other non-audio dependencies with the same set. Shared systems can sit at the root of `FX`; an effect with enough private dependencies may earn an `FX/<Effect>` folder rather than scattering its set across type folders.

#### Maps

Every project tends to have its own map naming system, especially with sub-levels or streaming levels, but all levels belong in `/Content/Haeretica/Maps`.

Being able to name a map without explaining where it is saves time. Sub-folders like `Maps/Level1/` or `Maps/ArenaLevel1/` are fine.

Every level lives here, test levels included. A throwaway greybox, a balancing map, or a scratch level is still a level, so it goes under `Maps` like any other, grouped into a folder such as `Maps/TestLevels/`. Filing a level outside `Maps` to mark it disposable hides it from the one folder anyone checks for a map, and from the folder a build enumerates.

One map folder also makes cooking and lighting builds easier for engineers, and removes the risk of a map being left out of a build by accident. It simplifies QA too.

A level folder may contain a `_GENERATED` folder, at the root of `Maps` or inside a level folder: the editor's own transient output. `_GENERATED` is off-limits: it is machine-generated, fair to delete and regenerate at any time, and none of this guide's naming or structure rules apply inside it, so do not rename, move, or tidy its contents.

#### SFX

**All audio resources always belong in `SFX`, including music.** This is a project-specific structure rule that overrides ownership-first placement. Sound waves, cues, MetaSounds, dialogue, sound classes, mixes, attenuation, concurrency, and other audio resources stay here even when one character, weapon, screen, level, or system clearly owns them. For example, `SC_Player` belongs in `SFX/Classes` and `Cue_PlayerHurt` at the root of `SFX`, not with the player's art.

Consumers remain in their normal homes: an audio sublevel is a level asset under `Maps` and references audio resources in `SFX`. Supporting audio types can use folders such as `SFX/Classes`, `SFX/Mixes`, or `SFX/Concurrency` when their volume warrants it.

`SFX` uses Sound Cues (`Cue_`) as its main asset type; follow the layout in [Collections](#collections). In this project's workflow, sounds are normally played through cues; direct wave playback from Sound Waves (`S_`) is reserved for special cases, such as music. Cues are usually sound effects, so they also fit the folder's name, even though the collection includes all music and other audio too.

**Audio names carry their association because the assets live apart from their consumers.** Ownership remains clear in the name without moving resources out of `SFX`.

Name sounds in this order: **who, what, which**.

* **Who:** the character, object, system, or context the sound is for, such as `Player` or `MainMenu`.
* **What:** its purpose, such as `Hurt`, `BigHurt`, or `Music`.
* **Which:** when there are variations, a two-digit number starting at `01`, attached directly to the name with no extra underscore.

Use the asset's required type prefix, followed by `WhoWhatWhich`:

| Asset Name | Meaning |
| ---------- | ------- |
| `Cue_PlayerHurt` | Player hurt sound cue |
| `S_PlayerHurt01` | Player hurt, variation 01 |
| `S_PlayerHurt02` | Player hurt, variation 02 |
| `S_PlayerBigHurt01` | Player big hurt, variation 01 |
| `S_MainMenuMusic01` | Main menu music, variation 01 |

An asset with no variations just omits the number: `SC_Player` names the player's sound class. Shared audio should name its actual shared role or context. A Sound Wave feeding more than one cue takes a shared, generic name that fits every cue using it: `S_Explosion01` and `S_Explosion02` can feed both `Cue_GrenadeDetonation` and `Cue_BarrelExplosion`, so the generic `Explosion` name fits both.

All Sound Waves, including music and owner-specific sounds, belong in `SFX/Waves`. Do not recreate character or system folder trees inside `SFX`; names carry those associations. The other naming and organization rules still apply.

#### UI

`UI` holds shared Widget Blueprints and screen-owned interface sets. A screen with private dependencies may use a folder such as `UI/MainMenu` or `UI/Options`, keeping its widgets, materials, textures, and fonts together. A widget clearly owned by a character, weapon, or another gameplay system stays with that owner's art instead. Gameplay logic and code-only data follow the matching `Blueprint` system.

Generic widgets stay at the root of `UI`. Generic or shared UI materials and instances with no clear owner (`M_UI_`, `MI_UI_`) use `UI/Materials`; shared UI textures use `UI/Textures`; shared fonts use `Art/Fonts`. Owner-specific non-audio dependencies stay with their set. Context labels and UI texture settings still apply regardless of location.


### Collections

A **collection** groups assets by type or concept for browsing together. `Art/Materials` and `Art/Textures` are generic mesh type collections; `Art/Decals` and `Art/PostProcess` group the decal and post-process sets; `Art/Environment` is a collection for level design.

**Except for audio resources and level assets, clear ownership overrides collection membership.** Keep a character's, weapon's, screen's, effect's, or system's assets with that owner, including its non-audio supporting dependencies. Several consumers within the same owned set do not make an asset generic, and an external reference alone does not erase clear ownership. Keep a resource with its defining owner when that association remains clear. Use a collection when no specific owner is clear or when a resource is genuinely shared across independent owners without one defining owner. Project-specific exceptions take precedence: all audio resources always live in `SFX`, regardless of ownership, and all level assets live under `Maps`.

For assets without a specific owner, use the most specific applicable collection. Reusable level-design sets belong in `Art/Environment`; generic mesh materials and textures belong in `Art/Materials` and `Art/Textures`; shared decal and post-process sets belong in `Art/Decals` and `Art/PostProcess`. Keep a collection's own non-audio supporting dependencies with it rather than scattering them into other collections. A non-audio, non-level dependency clearly owned by one effect or screen stays with that set instead of being pooled solely by type.

Keep generic main assets directly at the collection's root. Use supporting-type sub-folders when volume makes browsing easier; do not create them for every small set. A collection whose assets are all one type, such as `Art/Textures`, stays flat until it genuinely needs a sub-folder. The table below describes collection layouts. Except for `SFX`, these are fallback homes used only when no specific owner is clear. `SFX` is mandatory for all audio resources.

| Collection | Main assets at the root | Supporting sub-folders |
| ---------- | ----------------------- | ---------------------- |
| `Art/Materials` | Generic mesh materials | `MaterialInstances`, `MaterialFunctions` |
| `Art/Textures` | Generic mesh textures | As needed |
| `Art/Decals` | Generic/shared decal resources | As needed |
| `Art/PostProcess` | Generic/shared post-process resources | As needed |
| `Art/Environment` | Reusable level-design assets | `Materials`, `Textures` |
| `UI` | Generic/shared Widget Blueprints | `Materials`, `Textures` |
| `FX` | Generic/shared Niagara Systems | `Materials`, `Meshes`, `Textures` |
| `SFX` | All Sound Cues | `Waves`, `Classes`, `Attenuation` |

#### Collection Examples

The screenshots below illustrate collection layouts for unowned, shared resources; `SFX` (all audio) and `Maps` (all levels) are the exceptions: [Figure 4](#figure-4) is `Art/Environment`, [Figure 5](#figure-5) is `FX`, [Figure 6](#figure-6) is `UI`, and [Figure 7](#figure-7) is `SFX`.

![The Art/Environment collection in the Content Browser: environment meshes at the root, with Materials and Textures sub-folders](https://raw.githubusercontent.com/Ultikynnys/ue5-style-guide/main/images/collection-environment.png)

**Figure 4.** `Art/Environment`: environment meshes at the root, with `Materials` and `Textures`.

![The FX collection in the Content Browser: Niagara Systems at the root, with Materials, Meshes, and Textures sub-folders](https://raw.githubusercontent.com/Ultikynnys/ue5-style-guide/main/images/collection-fx.png)

**Figure 5.** `FX`: Niagara Systems at the root, with `Materials`, `Meshes`, and `Textures`.

![The UI collection in the Content Browser: Widget Blueprints at the root, with Materials and Textures sub-folders](https://raw.githubusercontent.com/Ultikynnys/ue5-style-guide/main/images/collection-ui.png)

**Figure 6.** `UI`: Widget Blueprints at the root, with `Materials` and `Textures`.

![The SFX collection in the Content Browser: Sound Cues at the root, with Waves, Classes, and Attenuation sub-folders](https://raw.githubusercontent.com/Ultikynnys/ue5-style-guide/main/images/collection-sfx.png)

**Figure 7.** `SFX`: Sound Cues at the root, with `Waves`, `Classes`, and `Attenuation`.

Keep the structure shallow. Do not add a redundant folder for a collection's main type, such as `SFX/Cues`. Outside `SFX`, an owned set can earn its own folder, but do not repeat supporting-type sub-folders for every small set. `SFX` always groups by audio type, not by character or system. Minimize folders that contain only more folders, and create a supporting-type folder only when volume makes it useful.

**Keep the number of collections small.** They can scatter dependency chains, making related assets harder to rename, move, or remove together. Create one only when the browsing benefits for a large collection justify that cost.

A gameplay system's owned set is not a generic type collection. Its shared logic and code-only data live in `Blueprint/<System>/Base`; its shared art and non-audio supporting resources live in the matching `Art/<System>` set. Non-audio, non-level assets owned by one variant stay with that variant.

### Very Large Asset Sets Get Their Own Folder Layout

A very large set follows the rule of thumb like any collection: a large group of one supporting type may earn a sub-folder.

For example, animations genuinely shared across characters with no single owner may be easier to browse in a shared `Animations` folder; an animation owned by one character stays with that character. Further grouping by subject, such as `Locomotion` or `Cinematic`, should make the set easier to browse.

### `Art/Materials`

`Content/Haeretica/Art/Materials` holds generic mesh parent materials at its root, generic material instances in `MaterialInstances`, and generic material functions in `MaterialFunctions`; a parent material never sits in either sub-folder, and its instances live in many other folders with the assets they dress, reusing the parent. Browse this folder with the Content Browser's type filters.

> Reuse existing parent materials through instances where possible. Collection placement makes generic parents easy to find without separating an owner's private materials from the assets they serve.

Before creating a material, look at what already exists and instance an existing material; the goal is to keep the number of unique materials as low as possible. Association decides placement even for a material used only once: the hammer owns a one-off `M_HammerLandSpot`, so that material lives with the hammer. When in doubt, treat the material as generic and file it here.

Do not build an UBER material. A single material with static parameter switches for every feature looks tempting, and GPU execution stays cheap even with many switches, but every switch multiplies the shader permutations. The cost lands elsewhere: shader compilation time, editor responsiveness, cook and package time, and shader storage and memory.

It is also fragile to manage. A slight change can cascade into other branches of the material graph, and it recompiles the full permutation set, so even small tweaks stall iteration. Keep materials decoupled: it is good programming practice and good material practice alike.

Instead, keep materials in reasonable groups, for example by shading mode: `M_Opaque`, `M_Transparent`, `M_Foliage`. Never fold one-off implementations into these materials. They stay as generic as possible while enforcing visual cohesion, so the default way to shade anything in the project is an instance of one of them.

### `Art/Textures`

`Content/Haeretica/Art/Textures` is the home for the project's generic mesh textures: those that belong to no single concept, flat in one folder beside `Art/Materials`.

### `Art/GeometryCollection`

`Content/Haeretica/Art/GeometryCollection` holds generic destructible geometry with no clear owner. A geometry collection clearly owned by an interactable, character, or level stays with that associated set instead. The `GC_` prefix applies in either location.

### No Stray Empty Folders

Avoid stray empty folders; they clutter the Content Browser. The initial project structure is the exception: a few established homes for common, expected content may be empty, such as `Art/LUT` or `Art/PhysicalMaterials`. Generated folders are not covered at all: `_GENERATED` and the Content Browser's `Collections` folders are machine-managed, so leave them as their tools made them.

If the Content Browser has an empty folder you cannot delete:
1. Be sure you are using source control.
1. Run Fix Up Redirectors on your project.
1. Go to the folder on-disk and delete the assets inside.
1. Close the editor.
1. Sync your source control state (for Perforce, Reconcile Offline Work on your content directory).
1. Open the editor and confirm everything works; if not, revert and find the cause.
1. Confirm the folder is gone.
1. Submit to source control.


## Blueprint Guidelines

This section covers Blueprint classes and their internals. Where possible, the rules follow [Epic's Coding Standard](https://dev.epicgames.com/documentation/en-us/unreal-engine/epic-cplusplus-coding-standard-for-unreal-engine).

Remember: Blueprinting badly bears blunders, beware! (Phrase by [KorkuVeren](http://github.com/KorkuVeren))

### Compiling

All Blueprints must compile without warnings or errors. Fix issues immediately.

Do *not* submit broken Blueprints to source control. If you must store them, shelve them.

Broken Blueprints can cause broken references, unexpected behavior, cooking failures, and unnecessary recompilation throughout the project.

### Variables

The words `variable` and `property` may be used interchangeably.

#### Naming


**Nouns:** All non-boolean variable names must be clear, unambiguous, and descriptive nouns.


**PascalCase:** Use PascalCase for all non-boolean variable names.


**Examples:**

* `Score`
* `Kills`
* `TargetPlayer`
* `Range`
* `CrosshairColor`
* `AbilityID`


**Boolean `b` Prefix:**

All booleans should be named in PascalCase but prefixed with a lowercase `b`.

Example: `bDead`, `bEvil`.

The editor hides the `b` prefix when displaying the variable's name.


**Boolean Names:**


**General And Independent State Information:** Name a boolean as a descriptive adjective when it represents general information. Do not phrase it as a question with words such as `Is`, which is reserved for functions.

Example: `bDead`, `bHostile`.

Avoid verbs such as `bRunning`; they tend to lead to complex states.


**Complex States:** Use an enumeration for complex or mutually exclusive states. Separate booleans make state transitions harder to manage and understand.

Example: A weapon that cannot be both reloading and equipping should **not** use `bReloading` and `bEquipping`. Define an enumeration `E_WeaponState` and a variable `WeaponState` of that type, so new weapon states are easy to add.

Example: Do **not** use `bRunning` alongside `bWalking` or `bSprinting`; define an enumeration with clear state names.


**Considered Context:** Avoid repeating information already clear from the variable's owning Blueprint.


**Examples:**

Consider a Blueprint called `BP_PlayerCharacter`.

**Bad**

* `PlayerScore`
* `PlayerKills`
* `MyTargetPlayer`
* `MyCharacterName`
* `CharacterSkills`
* `ChosenCharacterSkin`

Each of these is redundant: a variable defined by `BP_PlayerCharacter` already implies it belongs to that Blueprint.

**Good**

* `Score`
* `Kills`
* `TargetPlayer`
* `Name`
* `Skills`
* `Skin`


**Do _Not_ Include Atomic Type Names**

Atomic variables hold data in its simplest form: booleans, integers, floats, and enumerations. For style, strings and vectors count as atomic too, though technically they are not.

> A vector holds three floats but is usually handled as a whole, as is a rotator.

> Do _not_ treat Text as atomic; it hides localization. The atomic type of a string of characters is `String`.

Name an atomic variable without its type.

Example: Use `Score`, `Kills`, and `Description`.

For counts, add `Num` or `Count` when the noun alone could be mistaken for a collection.

Example: A fence generator storing a post count uses `NumPosts` or `PostsCount`; plain `Posts` can read as an Array of a type named `Post`.


**Do Include Non-Atomic Type Names**

Non-atomic (complex) variables hold a collection of atomic values: structs, classes, interfaces, and primitives with hidden behavior such as `Text` and `Name`.

> An array does not change how its element type is classified for naming.

Include the type name, still considering context.

When a class owns an instance of a complex type, e.g. `BP_PlayerCharacter` owns a `BP_Hat`, store it under the type name with no modification.

Example: Use `Hat`, `Flag`, and `Ability`.

When a class does not own the value, use a noun plus the type name. A long type name may be shortened to the part that still identifies it.

Example: A `BP_Turret` targeting a `BP_PlayerCharacter` stores it as `TargetPlayer`: within `BP_Turret` that reads clearly as a reference it does not own.



**Arrays:**

Arrays follow the same rules but take a plural noun.

Example: Use `Targets`, `Hats`, and `EnemyPlayers`.


#### Editable Variables

Mark a variable `Editable` when it is safe to change to configure the Blueprint's behavior.

A variable that is unsafe to change, or that should not be exposed to designers, should _not_ be editable, unless engineering requires `Expose On Spawn`.

Do not mark variables `Editable` arbitrarily.


**Tooltips:**

Every `Editable` variable, including one made editable only for `Expose On Spawn`, needs a `Tooltip` explaining how changing it affects the Blueprint's behavior.


**Slider And Value Ranges:**

Use slider and value ranges on `Editable` variables whenever some value should _not_ be set.

Example: A fence generator's `PostsCount` should set 0 as a minimum; a value of -1 makes no sense.

Give editable variables used in a Construction Script reasonable Slider Ranges to discourage values large enough to crash the editor.

Define a Value Range only when the bounds are known: a Slider Range blocks accidental large inputs, while an undefined Value Range still lets a user enter a 'dangerous' but valid value outside it.

#### Categories

A class with few variables needs no categories.

With a moderate number (5-10), give every `Editable` variable a non-default category, commonly `Config`.

With many variables, group `Editable` variables into sub-categories under the base category `Config`, and give non-editable variables descriptive categories for their usage.

> You can define sub-categories by using the pipe character `|`, i.e. `Config | Animations`.

For example, a weapon's variables might be organized as follows:

    |-- Config
    |    |-- Animations
    |    |-- Effects
    |    |-- Audio
    |    |-- Recoil
    |    |-- Timings
    |-- Animations
    |-- State
    |-- Visuals

#### Variable Access Level

In C++, public means any code can read a variable, protected means the class and its children, private means the class alone.

Blueprints have no protected access.

Treat `Editable` variables as public and non-editable variables as protected.


**Private Variables:** Do not mark a variable private unless you know it should never be reached by a child class. Until Blueprints can mark variables `protected`, reserve private for when child-class access must be blocked.

#### Advanced Display

Mark a variable that is editable but rarely touched as `Advanced Display`, which hides it until the advanced display arrow is clicked. The option sits in the variable details list.

#### Transient Variables

Transient variables are not saved or loaded and start at zero or null, which suits references to objects and actors whose value is unknown until run-time. This stops the editor saving a reference and speeds up saving and loading the class.

Always initialize a transient variable to zero or null; anything else causes hard-to-debug errors.

#### Config Variables

Do not use the `Config Variable` flag; it makes Blueprint behavior harder for designers to control. Reserve config variables for C++ and rarely changed values, and mark such variables `Advanced Display`.

### Functions, Events, and Event Dispatchers

This section covers functions, events, and event dispatchers. Function rules also apply to events unless an exception is noted.

#### Function Naming

Function, event, and event dispatcher names matter: the name alone should answer questions such as:

* Is it a pure function?
* Is it fetching state information?
* Is it a handler?
* Is it an RPC?
* What is its purpose?


**All Functions Should Be Verbs**

Functions and events perform actions: retrieving information, computing values, or triggering behavior. Start their names with a verb, preferably in the present tense, and add enough context to make the action clear. For an RPC, the verb follows the required `Server`, `Client`, or `Multicast` prefix instead of leading the name.

`OnRep` functions, event handlers, event dispatchers, and the required RPC prefix are exempt.

Good examples:

* `Fire` - Good example if in a Character / Weapon class, as it has context. Bad if in a Barrel / Grass / any ambiguous class.
* `Jump` - Good example if in a Character class, otherwise, needs context.
* `Explode`
* `ReceiveMessage`
* `SortPlayerArray`
* `GetArmOffset`
* `GetCoordinates`
* `UpdateTransforms`
* `EnableBigHeadMode`
* `IsEnemy` - ["Is" is a verb.](http://writingexplained.org/is-is-a-verb)

Bad examples:

* `Dead` - Is Dead? Will deaden?
* `Rock`
* `ProcessData` - Ambiguous, these words mean nothing.
* `PlayerState` - Nouns are ambiguous.
* `Color` - Verb with no context, or ambiguous noun.


**Property RepNotify Functions Always `OnRep_Variable`**

Functions for replicated variables with notification take the form `OnRep_Variable`, forced by the Blueprint editor. A C++ `OnRep` function follows the same convention when exposed to Blueprints.


**Info Functions Returning Bool Should Ask Questions**

A function that changes no state, and only gets information or computes a yes/no value, should ask a question.

Without the question it reads as an action that returns whether it succeeded.

Good examples:

* `IsDead`
* `IsOnFire`
* `IsAlive`
* `IsSpeaking`
* `IsHavingAnExistentialCrisis`
* `IsVisible`
* `HasWeapon` - ["Has" is a verb.](http://grammar.yourdictionary.com/parts-of-speech/verbs/Helping-Verbs.html)
* `WasCharging` - ["Was" is past-tense of "be".](http://grammar.yourdictionary.com/parts-of-speech/verbs/Helping-Verbs.html) Use "was" when referring to 'previous frame' or 'previous state'.
* `CanReload` - ["Can" is a verb.](http://grammar.yourdictionary.com/parts-of-speech/verbs/Helping-Verbs.html)

Bad examples:

* `Fire` - Is on fire? Will fire? Do fire?
* `OnFire` - Can be confused with event dispatcher for firing.
* `Dead` - Is dead? Will deaden?
* `Visibility` - Is visible? Set visibility? A description of flying conditions?


**Event Handlers and Dispatchers Should Start With `On`**

Event handlers and dispatchers start with `On`, though the verb may move to the end when past tense reads better.

[Collocations](http://dictionary.cambridge.org/us/grammar/british-grammar/about-words-clauses-and-sentences/collocation) of `On` are exempt from the verb rule: when `On` plus the word already names the event, as in `OnDeath`, `OnPickup`, and `OnClick`, no verb is needed; otherwise keep one, as in `OnTargetChanged`.

`Handle` is not allowed: Unreal uses `On`, even where other frameworks prefer `Handle`.

Good examples:

* `OnDeath` - Common collocation in games
* `OnPickup`
* `OnReceiveMessage`
* `OnMessageReceived`
* `OnTargetChanged`
* `OnClick`
* `OnLeave`

Bad examples:

* `OnData`
* `OnTarget`
* `HandleMessage`
* `HandleDeath`


**Remote Procedure Calls Should Be Prefixed With `Server`, `Client`, or `Multicast`**

Prefix every RPC with `Server`, `Client`, or `Multicast`, no exceptions, then follow the other function-naming rules.

Good examples:

* `ServerFireWeapon`
* `ClientNotifyDeath`
* `MulticastSpawnTracerEffect`

Bad examples:

* `FireWeapon` - Does not indicate that it is an RPC.
* `ServerClientBroadcast` - Confusing.
* `AllNotifyDeath` - Use `Multicast`.
* `ClientWeapon` - No verb, ambiguous.


#### All Functions Must Have Return Nodes

All functions must have return nodes. Events are exempt, since a Blueprint event has no return node.

A return node marks where a function's execution ends. In graphs full of `Sequence`, `ForLoopWithBreak`, and reroute nodes, an explicit end point aids readability, maintenance, and debugging.

Return nodes also let the Blueprint compiler follow execution and warn about an unhandled return or broken flow. Without one, adding a pin to a Sequence node or logic after a loop that can return early slips past unnoticed.

#### No Function Should Have More Than 50 Nodes

No function should have more than 50 nodes; break anything larger into smaller functions for readability and maintenance.

These nodes do not count, as they add no complexity:

* Comment
* Reroute
* Cast
* Getting a Variable
* Breaking a Struct
* Function Entry
* Self

#### All Public Functions Should Have A Description

Descriptions are especially important for public-facing and marketplace Blueprints, where others need to understand the API.

Any function with Public access needs its description filled out.

#### All Custom Static Plugin `BlueprintCallable` Functions Must Be Categorized By Plugin Name

`static` `BlueprintCallable` functions from a plugin take the plugin's name, or a subset of it, as their category, e.g. `Zed Camera Interface` or `Zed Camera Interface | Image Capturing`.

### Blueprint Graphs

These rules apply to all Blueprint graphs.

#### No Spaghetti

Make wire paths easy to follow. Readers should not have to untangle connections mentally to understand a graph.

#### Align Wires

Node sizes and pin positions vary, but moving the nodes can keep the wires straight and the flow clear. Select the Blueprint nodes and use Straighten Connections (Q). See [Figure 8](#figure-8), [Figure 9](#figure-9), and [Figure 10](#figure-10) for good, bad, and acceptable results.

Good example: The tops of the nodes are staggered to keep a perfectly straight white exec line.
![Aligned By Wires](https://raw.githubusercontent.com/Ultikynnys/ue5-style-guide/main/images/bp-graphs-align-wires-good.png "Aligned By Wires")

**Figure 8.** Good: Staggered node tops keep the white execution wire straight.

Bad example: Aligning the tops of the nodes makes the white execution wire bend unnecessarily.
![Bad](https://raw.githubusercontent.com/Ultikynnys/ue5-style-guide/main/images/bp-graphs-align-wires-bad.png "Wiggly")

**Figure 9.** Bad: Aligning node tops makes the execution wire wiggly.

Acceptable example: When nodes cannot align cleanly, move them closer together to reduce bends in the wire.
![Acceptable](https://raw.githubusercontent.com/Ultikynnys/ue5-style-guide/main/images/bp-graphs-align-wires-acceptable.png "Acceptable")

**Figure 10.** Acceptable: When nodes cannot align perfectly, reduce the wire wiggle by moving them closer.

#### White Exec Lines Are Top Priority

When you must choose, straighten the white exec line over any data lines.

#### Graphs Should Be Reasonably Commented

Wrap blocks of nodes in a comment describing their higher-level purpose. A short graph whose nodes each clearly serve the function's goal needs no comments beyond a good function name and description.

#### Graphs Should Handle Casting Errors Where Appropriate

A function or event that assumes a cast succeeds should report a logic failure when it does not, so others know why something that should have worked failed. If the reference can legitimately fail, recover gracefully.

Not every cast needs failure handling: collision events and the like are expected to end quietly on a failed cast.

#### Graphs Should Not Have Any Dangling / Loose / Dead Nodes

Every node in every Blueprint graph must have a purpose; leave no dangling or unexecuted nodes.


## Static Meshes

This section covers Static Mesh assets and their settings.

### Static Mesh UVs

If Linter reports bad UVs and you cannot track them down, open the `.log` in your project's `Saved/Logs` folder for the exact reason.

### All Meshes Must Have UVs

Every mesh, however it is used, must have UVs.

### All Meshes Should Not Have Overlapping UVs for Lightmaps

Overlapping lightmap UVs can cause visual artifacts during baked lighting. Address them during asset creation when lightmaps are needed. Prioritize existing problems, such as artifacts visible after a lighting bake.

### LODs Should Be Set Up Correctly

Choose LODs to suit the project. Meshes viewed at varying distances should have appropriate LODs.

### Modular Socketless Assets Should Snap To The Grid Cleanly

Modular socketless assets should fit together cleanly using the project's grid settings.

The project chooses a power-of-2 or base-10 grid. For marketplace assets, Epic requires clean snapping at a grid of 10 units or larger.

### Meshes Must Have Collision Where They Are Used

Meshes requiring physical interaction or collision queries must have suitable, well-formed collision. Visual-only meshes, such as those used by Niagara effects, may omit collision.

### All Meshes Should Be Scaled Correctly

Author meshes at the correct scale for the project. Designers and Blueprint authors should not need to adjust their scale to make them fit. Scaling in the editor is an override; an incorrectly scaled asset should be fixed at its source.


## Niagara

This section covers Niagara VFX assets: how they are named, how a System relates to its Emitters, and how to keep effects scalable and cullable.

### No Spaces, Ever

Whitespace in identifiers is banned throughout this guide; in Niagara it matters double, where HLSL and other scripts need to reference those names.

(Original Contribution by [@dunenkoff](https://github.com/Allar/ue5-style-guide/issues/58))

### A System Is The Placeable Asset

A Niagara System is the asset a level or Blueprint places and references; a Niagara Emitter is a sub-asset the System consumes. Effects spawn as Systems.

Emitters, modules, and scripts are added from menus inside the Niagara editor, so they need no visual distinction. Their prefixes serve search and the Content Browser.

### Naming

Niagara assets use these prefixes: `NS_` for a System, `NE_` for an Emitter, `NM_` for a Module Script, and `NP_` for a Parameter Collection, with `NPI_` for an instance. The `NS_` prefix matches Epic's own Niagara convention; there is no need for `FXS_` or `VFX_` variants.

### Scalability Belongs To The Effect Type

A System's quality, significance, and culling come from its [Effect Type](https://dev.epicgames.com/documentation/en-us/unreal-engine/scalability-and-best-practices-for-niagara). Define scalability once in the Effect Type: the effect then behaves the same wherever it spawns and scales down for weaker targets without editing the System.

### Set Bounds Correctly

Prefer fixed bounds that cover the volume the effect can actually occupy. GPU emitters must use a supported bounds mode (fixed or programmable), since dynamic bounds are CPU-only; a CPU emitter may use dynamic bounds where justified. A System whose bounds do not contain the effect culls incorrectly: it pops out of view early, or never culls and keeps costing performance off screen.

### Pick The Right Emitter Sim Target

Choose each emitter's sim target from its own requirements. A GPU emitter suits high particle counts and effects with no per-particle gameplay reads. A CPU emitter is needed when gameplay reads or writes particle attributes, when determinism or replication matters, or when the count is low enough that GPU dispatch and readback overhead dominates. GPU emitters can collide against the world through scene depth, distance fields, or GPU ray tracing, within their limits; choose a CPU emitter when collision or reads must be exact. Treat any CPU/GPU crossover point as a heuristic and confirm it by profiling on target hardware. An emitter chosen only "because it was easier" is a performance bug waiting to happen.

### Reuse Emitters And Modules

Prefer a shared emitter or module over a copied-and-tweaked one. A duplicated graph drifts: a fix applied to one copy is missed by the others, and each copy adds another near-identical asset to the Content Browser. Put the variation in an exposed parameter.


## Levels / Maps

This section covers level assets and their setup.

### No Errors Or Warnings

All levels load with zero errors or warnings; fix any immediately to prevent cascading issues.

Run a map check on an open level with the console command "map check".

Linter is stricter than the editor and catches load errors the editor resolves on its own.

### Lighting Should Be Built

Lighting may remain unbuilt during development. If the project uses precomputed lighting, build it before distributing any test, internal, or shipping build.

### No Player Visible Z Fighting

No [z-fighting](https://en.wikipedia.org/wiki/Z-fighting) anywhere the player can see.

### Compose Levels From Isolated Components

Split a playable area into multiple level components, except for a small or test level where one monolithic map is fine. The Persistent Level is the composition root: it references and coordinates components but holds no authored gameplay, lighting, audio, geometry, or segment content. Treat it as glue only, and do not edit it for ordinary feature work. This convention applies to projects using traditional level streaming; World Partition projects follow their project's World Partition architecture.

For a composed level using traditional streaming, name the Persistent Level with the `_P` suffix and split independently owned work into focused components using the established suffixes, with extra world segments under clear names such as `_Segment01`. Put Level Blueprint logic in the `_Gameplay` component: each contributor works in one component while the Persistent Level stays the stable assembly point. A small or test level that stays monolithic keeps its Level Blueprint logic locally in that map.

[Figure 11](#figure-11) shows a Persistent Level with separate gameplay, geometry, lighting, audio, and segment components.

![Example of a composed level with a Persistent Level and separate level components](https://raw.githubusercontent.com/Ultikynnys/ue5-style-guide/main/images/level-composition-example.png)

**Figure 11.** A Persistent Level assembling separate gameplay, geometry, lighting, audio, and segment components.

## Texture Guidelines

This section covers texture assets and their settings.

### Dimensions Are Powers of 2

Every texture except a UI texture must have dimensions that are powers of 2; textures need not be square.

For example: `128x512`, `1024x1024`, `2048x1024`, `1024x2048`, `1x512`.

### Texture Density Should Be Uniform

Choose texture sizes for their intended use. Each project sets its own texel density, but assets within that project should follow it consistently.

For example, at 8 pixels per unit, a texture applied to a 100x100 unit cube is 1024x1024, the closest power of 2 to that density.

### Textures Should Be No Bigger than 8192

No texture dimension exceeds 8192 unless you have an explicit reason; a texture that large usually just wastes resources.

### Textures Should Be Grouped Correctly

Set each texture's Texture Group to match its intended use and LOD behavior. For example, all UI textures belong in the UI texture group.
